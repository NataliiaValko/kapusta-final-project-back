const { UserService } = require('../../services');
const { cookieOptions } = require('../../config');
const { UserDTO } = require('../../DTO');
const { isErrorOrFalsyValue, responseWithError } = require('../../helpers');

const refresh = async (req, res, next) => {
  const { refreshToken } = req.cookies;

  const { user, tokens } = await UserService.refresh(refreshToken);

  if (isErrorOrFalsyValue(user)) {
    return responseWithError(user, next);
  }

  const userData = UserDTO.getUserInfoWithToken({ user, tokens });

  res.cookie('refreshToken', tokens.refreshToken, cookieOptions);
  res.status(200).json({
    message: 'success',
    data: {
      ...userData,
    },
  });
};

module.exports = { refresh };
