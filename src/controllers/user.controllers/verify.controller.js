const { UserService } = require('../../services');
const { isErrorOrFalsyValue, responseWithError } = require('../../helpers');

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await UserService.verify(verificationToken);

  if (isErrorOrFalsyValue(user)) {
    return responseWithError(user, next);
  }

  res.status(200).json({
    message: 'Verification successful',
  });
};

module.exports = { verify };
