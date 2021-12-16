const fs = require('fs');
const { User } = require('../../model');
const { fileService } = require('../upload.service');
const { TEMP_FOLDER_PATH } = require('../../config');

const changeAvatar = async ({ user: { _id } }, file) => {
  const { path, originalname } = file;

  try {
    const avatar = await fileService.uploadFile(_id, path);

    const user = await User.findByIdAndUpdate(
      _id,
      { avatar },
      {
        new: true,
      }
    );

    return user;
  } catch (error) {
    return error;
  } finally {
    await fs.unlink(`${TEMP_FOLDER_PATH}/${originalname}`, (err) => {
      if (err) throw err;
      console.log('temp folder clear');
    });
  }
};

module.exports = { changeAvatar };
