const TokenService = require("../token.service");

const logout = async (_id) => {
  try {
    return await TokenService.removeToken(_id);
  } catch (error) {
    return error;
  }
};

module.exports = { logout };
