const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = require('../config');
const { User } = require('../model');
const { ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN } = require('../config');

const generateTokens = (payload) => {
  const accessToken = jwt.sign({ payload }, JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES_IN,
  });
  const refreshToken = jwt.sign({ payload }, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

const saveRefreshToken = async (userId, refreshToken) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      refreshToken,
    },
    { new: true }
  );
};

const validateAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_ACCESS_SECRET);
  } catch (_) {
    return null;
  }
};

const validateRefreshToken = (token) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (_) {
    return null;
  }
};

const findUserByToken = async (refreshToken) => {
  return await User.findOne({ refreshToken });
};

const removeToken = async (refreshToken) => {
  return await User.findOneAndUpdate(
    { refreshToken },
    {
      $set: {
        refreshToken: null,
      },
    },
    { new: true }
  );
};

module.exports = {
  generateTokens,
  saveRefreshToken,
  removeToken,
  validateAccessToken,
  validateRefreshToken,
  findUserByToken,
};
