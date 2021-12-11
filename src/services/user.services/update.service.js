const { User } = require('../../model');

const update = async (body) => {
  try {
    const {
      user: { _id },
      ...rest
    } = body;

    const user = await User.findByIdAndUpdate(_id, { $set: { ...rest } }, { new: true });

    return { user };
  } catch (error) {
    return error;
  }
};

module.exports = { update };
