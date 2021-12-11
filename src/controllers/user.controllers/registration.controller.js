const { UserService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers');
const { cookieOptions } = require('../../config');

const registration = async (req, res, next) => {
  const serviceRes = await UserService.registration(req.body);

  if (isErrorOrFalsyValue(serviceRes)) {
    return next(serviceRes);
  }

  const {
    newUser: { email },
    tokens: { refreshToken },
  } = serviceRes;

  res.cookie('refreshToken', refreshToken, cookieOptions);
  res.status(201).json({ message: 'success', data: { email } });
};

module.exports = { registration };
