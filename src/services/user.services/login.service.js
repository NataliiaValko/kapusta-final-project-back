const { User } = require('../../model');
const TokenService = require('../token.service');

const login = async ({ email }) => {
  try {
    const user = await User.findOne({ email });

    const tokens = TokenService.generateTokens(user.email);

    await TokenService.saveRefreshToken(user._id, tokens.refreshToken);

    return { user, tokens };
  } catch (error) {
    return error;
  }
};

module.exports = { login };
