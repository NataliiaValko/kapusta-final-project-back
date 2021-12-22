const { UserService } = require("../../services");
const { isErrorOrFalsyValue, responseWithError } = require("../../helpers");

const logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  const obj = await UserService.logout(refreshToken);

  if (isErrorOrFalsyValue(obj)) {
    return responseWithError(obj, next);
  }

  // res.clearCookie('refreshToken');
  res.status(204).json();
};

module.exports = { logout };
