const { UserService } = require("../../services");
const { cookieOptions } = require("../../config");
const { UserDTO } = require("../../DTO");
const { isErrorOrFalsyValue, responseWithError } = require("../../helpers");

const refresh = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  const user = await UserService.refresh(refreshToken);

  if (isErrorOrFalsyValue(user)) {
    return responseWithError(user, next);
  }

  const userData = UserDTO.getUserInfoWithToken(user);

  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Allow-Method", "GET, POST, PATCH,OPTIONS");
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "origin, content-type, accept, X-Requested-With"
  // );
  // res.cookie("refreshToken", refreshToken, cookieOptions);
  res.status(200).json({
    message: "success",
    data: {
      ...userData,
    },
  });
};

module.exports = { refresh };
