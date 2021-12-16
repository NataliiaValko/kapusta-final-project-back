const multer = require('multer');
const { BadRequest } = require('http-errors');
const { MAX_AVATAR_SIZE, TEMP_FOLDER_PATH, IMAGE_MIME_TYPES, uploadConfig } = require('../config');
const { clearTempFolder } = require('../helpers');

console.log(TEMP_FOLDER_PATH);

const uploadMiddleware = multer({
  storage: uploadConfig,
  limits: {
    files: 1,
    fileSize: MAX_AVATAR_SIZE,
  },
  fileFilter: (_, file, cb) => {
    if (!IMAGE_MIME_TYPES.includes(file.mimetype)) {
      clearTempFolder(TEMP_FOLDER_PATH);

      cb({ message: 'Bad mimetype', status: 400 });
    }

    cb(null, true);
  },
});

const checkFilePresence = (req, _, next) => {
  if (req.file === undefined) {
    next(new BadRequest('No file attached'));
  }

  next();
};

module.exports = { uploadMiddleware, checkFilePresence };
