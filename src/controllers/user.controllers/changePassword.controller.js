const { UserService } = require('../../services');
const { isErrorOrFalsyValue, responseWithError } = require('../../helpers');

const changePassword = async (req, res, next) => {
  const user = await UserService.changePassword(req.body);

  if (isErrorOrFalsyValue(user)) {
    return responseWithError(user, next);
  }

  res.status(200).json({
    message: 'Password successfully changed',
  });
};

module.exports = { changePassword };
