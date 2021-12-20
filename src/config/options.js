const multer = require('multer');
const { COOKIE_MAX_AGE, TEMP_FOLDER_PATH, ALLOWED_DOMAINS } = require('./constants');

const cookieOptions = {
  maxAge: COOKIE_MAX_AGE,
  httpOnly: true,
  secure: true,
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
