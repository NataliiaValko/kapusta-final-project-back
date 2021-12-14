const { BadRequest } = require('http-errors');
const { User } = require('../../model');

const update = async (body) => {
  try {
    const {
      user: { _id, isBalanceSetted },
      ...updateUserData
    } = body;

    if (isBalanceSetted && 'balance' in updateUserData) {
      return new BadRequest('Balance is already setted');
    } else if (!isBalanceSetted && 'balance' in updateUserData) {
      updateUserData.isBalanceSetted = true;
    }

    const user = await User.findByIdAndUpdate(_id, { $set: { ...updateUserData } }, { new: true });

    return user;
  } catch (error) {
    return error;
  }
};

module.exports = { update };
