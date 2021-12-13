const { v4 } = require("uuid");
const { BadRequest } = require("http-errors");
const { User } = require("../../model");
const { isDuplicateKeyError } = require("../../helpers");
const { mailService } = require("../mail.service/mail.service");
const { UserDTO } = require("../../DTO");
const TokenService = require("../token.service");

const registration = async (user) => {
  try {
    const { fullName, email, password } = UserDTO.getUserRegistrationData(user);
    const verificationToken = v4();
    const tokens = TokenService.generateTokens(email);
    const { refreshToken } = tokens;

    const newUser = new User({
      email,
      verificationToken,
      refreshToken,
      fullName,
    });

    newUser.setPassword(password);

    await newUser.save();

    await mailService.sendActivationMail(email, verificationToken);

    return { newUser, tokens };
  } catch (error) {
    return isDuplicateKeyError(error)
      ? new BadRequest("User with same email already exists.")
      : error;
  }
};

module.exports = { registration };
