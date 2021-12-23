const multer = require('multer');
const { COOKIE_MAX_AGE, TEMP_FOLDER_PATH, ALLOWED_DOMAINS } = require('./constants');
const { NODE_ENV } = require('./config');

const cookieOptions = {
  maxAge: COOKIE_MAX_AGE,
  secure: NODE_ENV !== 'development',
  sameSite: NODE_ENV === 'development' ? false : 'none',
};

const corsOptions = {
  origin: ALLOWED_DOMAINS,
  credentials: true,
};

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_FOLDER_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = { cookieOptions, uploadConfig, corsOptions };
