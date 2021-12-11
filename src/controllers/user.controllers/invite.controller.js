const { UserService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers');

const invite = async (req, res, next) => {
  const mailResponse = await UserService.invite(req.body);

  if (isErrorOrFalsyValue(mailResponse)) {
    return next(mailResponse);
  }

  res.status(200).json({ message: 'Invitation successful' });
};

module.exports = { invite };
