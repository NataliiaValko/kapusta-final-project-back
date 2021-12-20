const { NotFound } = require('http-errors');
const { User } = require('../../model');

const verifyPhone = async (phone, code) => {
  try {
    const searchedUser = await User.findOneAndUpdate(
      { verificationToken },
      {
        verificationToken: null,
        emailVerified: true,
      },
      { new: true }
    );

    return !searchedUser ? new NotFound('User not found') : searchedUser;
  } catch (error) {
    return error;
  }
};

module.exports = { verifyPhone };
