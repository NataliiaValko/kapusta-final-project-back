const { BadRequest } = require('http-errors');
const { User } = require('../../model');

const changePassword = async (body) => {
  try {
    const {
      user: { _id },
      oldPassword,
      newPassword,
    } = body;

    if (oldPassword === newPassword) {
      return BadRequest('Passwords are equal. Use another one.');
    }

    const user = await User.findById(_id);

    user.setPassword(newPassword);

    await user.save();

    return user;
  } catch (error) {
    return error;
  }
};

module.exports = { changePassword };
