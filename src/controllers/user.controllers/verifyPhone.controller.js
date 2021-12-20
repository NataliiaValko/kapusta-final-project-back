const { UserService } = require('../../services');
const { isErrorOrFalsyValue, responseWithError } = require('../../helpers');

const verifyPhone = async (req, res, next) => {
  const { phone } = req.body;

  const user = await UserService.verifyPhone(phone);

  if (isErrorOrFalsyValue(user)) {
    return responseWithError(user, next);
  }

  res.status(200).json({
    message: 'Verification successful',
  });
};

module.exports = { verifyPhone };
