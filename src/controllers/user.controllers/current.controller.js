const { UserService } = require("../../services");
const { isErrorOrFalsyValue } = require("../../helpers");
const { UserDTO } = require("../../DTO");
const { cookieOptions } = require("../../config");

const current = async (req, res, next) => {
  const user = await UserService.current(req.body);

  if (isErrorOrFalsyValue(user)) {
    return next(user);
  }

  const {
    user: { refreshToken },
  } = user;
  const userData = UserDTO.getUserSimpleInfo(user);

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Method", "GET, POST, PATCH, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept, X-Requested-With"
  );

  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.status(200).json({ message: "success", data: { ...userData } });
};

module.exports = { current };
