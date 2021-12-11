const { COOKIE_MAX_AGE } = require('./constants');

const cookieOptions = {
  maxAge: COOKIE_MAX_AGE,
  httpOnly: true,
};

module.exports = { cookieOptions };
