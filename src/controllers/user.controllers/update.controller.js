const { UserService } = require('../../services');
const { isErrorOrFalsyValue, responseWithError } = require('../../helpers');
const { UserDTO } = require('../../DTO');

const update = async (req, res, next) => {
  const user = await UserService.update(req.body);

  if (isErrorOrFalsyValue(user)) {
    return responseWithError(user, next);
  }

  const userData = UserDTO.getUserSimpleInfo({ user });

  // console.log("userData", userData);

  res.status(200).json({
    message: 'success',
    data: {
      ...userData,
    },
  });
};

module.exports = { update };
