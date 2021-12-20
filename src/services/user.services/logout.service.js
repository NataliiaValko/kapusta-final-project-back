const TokenService = require('../token.service');

const logout = async (refreshToken) => {
  try {
    return await TokenService.removeToken(refreshToken);
  } catch (error) {
    return error;
  }
};

module.exports = { logout };
