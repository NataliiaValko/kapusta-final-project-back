const path = require("path");
const { UserService } = require("../../services");
const { isErrorOrFalsyValue, responseWithError } = require("../../helpers");

const successVerificationFile = path.join(
  __dirname,
  "../../static/success.html"
);

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await UserService.verify(verificationToken);

  if (isErrorOrFalsyValue(user)) {
    return responseWithError(user, next);
  }

  res.sendFile(successVerificationFile);
};

module.exports = { verify };
