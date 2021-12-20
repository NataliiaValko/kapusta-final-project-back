const { UserService } = require('../../services');
const { isErrorOrFalsyValue, responseWithError } = require('../../helpers');

const verifyPhone = async (req, res, next) => {
  const {
    phone,
    user: { _id },
  } = req.body;

  if ('code' in body) {
    const user = await UserService.verifyPhone(_id, phone, code);

    if (isErrorOrFalsyValue(user)) {
      return responseWithError(user, next);
    }

    res.status(200).json({
      message: 'Verification successful',
    });
  }

  const user = await UserService.verifyPhone(_id, phone);

  if (isErrorOrFalsyValue(user)) {
    return responseWithError(user, next);
  }

  res.status(200).json({
    message: 'Code sent',
  });
};

module.exports = { verifyPhone };
