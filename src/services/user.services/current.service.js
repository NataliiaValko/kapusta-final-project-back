const { User } = require('../../model');

const current = async ({ user: { _id } }) => {
  const user = await User.findById({ _id });

  return { user };
};

module.exports = { current };
