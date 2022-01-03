const fs = require('fs');
const { User } = require('../../model');
const { fileService } = require('../upload.service');

const changeAvatar = async ({ user: { _id } }, file) => {
  const { path } = file;
  let avatar = null;
  try {
    avatar = await fileService.uploadFile(_id, path);
    const { avatarUrl } = avatar;

    const user = await User.findByIdAndUpdate(_id, { avatar: avatarUrl }, { new: true });

    return user;
  } catch (error) {
    return error;
  } finally {
    await fs.unlink(`${avatar.newFilePath}`, (err) => {
      if (err) throw err;
    });
  }
};

module.exports = { changeAvatar };
