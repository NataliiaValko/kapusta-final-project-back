const { Unauthorized } = require('http-errors');
const { User } = require('../../model');
const TokenService = require('../token.service');

const refresh = async (refreshToken) => {
  try {
    if (!refreshToken) {
      return new Unauthorized('No refresh token');
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const userByToken = await TokenService.findUserByToken(refreshToken);

    if (!userData || !userByToken) {
      return new Unauthorized('Unauthorized');
    }

    const { payload: userEmail } = userData;

    const user = await User.findOne({ userEmail });
    const tokens = TokenService.generateTokens(user.email);
    await TokenService.saveRefreshToken(user._id, tokens.refreshToken);

    return { user, tokens };
  } catch (error) {
    return error;
  }
};

module.exports = { refresh };
