const multer = require("multer");
const { COOKIE_MAX_AGE, TEMP_FOLDER_PATH } = require("./constants");

const cookieOptions = {
  maxAge: COOKIE_MAX_AGE,
  httpOnly: true,
  secure: true,
};

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_FOLDER_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

module.exports = { cookieOptions, uploadConfig };
