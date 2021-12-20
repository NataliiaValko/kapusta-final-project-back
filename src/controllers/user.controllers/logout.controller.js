const { UserService } = require("../../services");
const { isErrorOrFalsyValue, responseWithError } = require("../../helpers");

const logout = async (req, res, next) => {
  const { _id } = req.body.user;

  const obj = await UserService.logout(_id);

  if (isErrorOrFalsyValue(obj)) {
    return responseWithError(obj, next);
  }

  res.clearCookie("refreshToken");
  res.status(204).json();
};

/*
 * Old varian with cookie
 */

// const logout = async (req, res, next) => {
//   const refreshToken = req.cookies?.refreshToken;

//   console.log("refreshToken", refreshToken);
//   console.log("req.cookies", req.cookies);
//   console.log("req.cookie", req.cookie);

//   const obj = await UserService.logout(refreshToken);

//   console.log("obj", obj);

//   if (isErrorOrFalsyValue(obj)) {
//     console.log("here");
//     return responseWithError(obj, next);
//   }

//   res.clearCookie("refreshToken");
//   res.status(204).json();
// };

module.exports = { logout };
