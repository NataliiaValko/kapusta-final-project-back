const { UserService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers');
const { UserDTO } = require('../../DTO');
const { cookieOptions } = require('../../config');

const current = async (req, res, next) => {
  const user = await UserService.current(req.body);

  if (isErrorOrFalsyValue(user)) {
    return next(user);
  }

  const userData = UserDTO.getUserSimpleInfo(user);

  res.status(200).json({ message: 'success', data: { ...userData } });
};

module.exports = { current };
