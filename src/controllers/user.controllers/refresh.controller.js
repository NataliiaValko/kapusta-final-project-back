const { UserService } = require("../../services");
// const { cookieOptions } = require("../../config");
const { UserDTO } = require("../../DTO");
const { isErrorOrFalsyValue, responseWithError } = require("../../helpers");

const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;

  const refreshData = await UserService.refresh(refreshToken);

  if (isErrorOrFalsyValue(refreshData)) {
    return responseWithError(refreshData, next);
  }

  const { user, tokens } = refreshData;
  const userData = UserDTO.getUserInfoWithTokens({ user, tokens });

  // res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
  res.status(200).json({
    message: "success",
    data: {
      ...userData,
    },
  });
};

module.exports = { refresh };
