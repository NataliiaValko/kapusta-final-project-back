const { UserService } = require('../../services');
const { isErrorOrFalsyValue, responseWithError } = require('../../helpers');
const { UserDTO } = require('../../DTO');

const changeAvatar = async (req, res, next) => {
  const user = await UserService.changeAvatar(req.body, req.file);

  if (isErrorOrFalsyValue(user)) {
    return responseWithError(user, next);
  }

  const userData = UserDTO.getUserSimpleInfo({ user });

  res.status(200).json({
    message: 'success',
    data: {
      ...userData,
    },
  });
};

module.exports = { changeAvatar };
