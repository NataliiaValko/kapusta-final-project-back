const { Unauthorized } = require("http-errors");
const { User } = require("../../model");
const TokenService = require("../token.service");

const refresh = async (refreshToken) => {
  if (!refreshToken) {
    return new Unauthorized("No refresh token");
  }

  console.log("refreshToken", refreshToken);

  const userData = TokenService.validateRefreshToken(refreshToken);
  const tokenFromDatabase = await TokenService.findUserByToken(refreshToken);

  console.log("userData", userData);
  console.log("tokenFromDatabase", tokenFromDatabase);

  if (!userData || !tokenFromDatabase) {
    console.log("here");
    return new Unauthorized("Unauthorized");
  }

  const { payload: userEmail } = userData;

  const user = await User.findOne({ userEmail });
  const tokens = TokenService.generateTokens(user.email);
  const res = await TokenService.saveRefreshToken(
    user._id,
    tokens.refreshToken
  );
  console.log("save", res);

  return { user, tokens };
};

module.exports = { refresh };
