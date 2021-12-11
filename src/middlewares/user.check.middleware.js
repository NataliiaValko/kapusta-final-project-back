const {
  BadRequest,
  Unauthorized,
  NotFound,
  Forbidden,
} = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../model");
const { JWT_ACCESS_SECRET } = require("../config");
const { isTokenExpiredError } = require("../helpers");
const { UserDTO } = require("../DTO");

const checkUserCredentials = async (req, _, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    next(new NotFound(`User with email "${email}" not found`));
  }

  if (!user?.comparePassword(password)) {
    next(new BadRequest(`Email or password is wrong`));
  }

  if (!user?.emailVerified) {
    next(new Forbidden(`User email is not verified`));
  }

  next();
};

const authenticateUser = async (req, _, next) => {
  try {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      next(new BadRequest("Bad Request: no Bearer"));
    }

    const { payload: payloadEmail } = jwt.verify(token, JWT_ACCESS_SECRET);

    const user = await User.findOne({ email: payloadEmail });

    if (!user || !user.refreshToken) {
      next(new NotFound("User not found"));
    }
    const { user: userData } = UserDTO.getUserInfoWithId({ user });

    req.body.user = { ...userData };
  } catch (error) {
    isTokenExpiredError(error)
      ? next(new Unauthorized(`Unauthorized: ${error}`))
      : next(error);
  }

  next();
};

module.exports = { checkUserCredentials, authenticateUser };
