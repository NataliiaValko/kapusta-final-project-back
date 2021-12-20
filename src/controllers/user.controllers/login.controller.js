const { UserService } = require("../../services");
const { isErrorOrFalsyValue, responseWithError } = require("../../helpers");
const { cookieOptions } = require("../../config");
const { UserDTO } = require("../../DTO");

const login = async (req, res, next) => {
  const { user, tokens } = await UserService.login(req.body);

  if (isErrorOrFalsyValue(user)) {
    return responseWithError(user, next);
  }

  const userData = UserDTO.getUserSimpleInfo({ user });
  const { refreshToken, accessToken } = tokens;

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Method", "GET, POST, PATCH, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept, X-Requested-With"
  );
  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.status(200).json({
    message: "success",
    data: {
      ...userData,
      accessToken,
    },
  });
};

module.exports = { login };
