const { User } = require("../../model");
const TokenService = require("../token.service");

const login = async ({ email }) => {
  try {
    const user = await User.findOne({ email });

    const tokens = TokenService.generateTokens(user.email);

    const res = await TokenService.saveRefreshToken(
      user._id,
      tokens.refreshToken
    );
    console.log("save", res);

    return { user, tokens };
  } catch (error) {
    return error;
  }
};

module.exports = { login };
