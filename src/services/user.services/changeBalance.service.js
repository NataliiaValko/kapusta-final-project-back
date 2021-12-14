const { User } = require('../../model');

const changeBalance = async (
  { owner: { email }, amount, type },
  isDeletingTransaction = false,
  amountDifference = null
) => {
  try {
    const user = await User.findOne({ email });

    if (isDeletingTransaction) {
      amount *= -1;
    }

    if (amountDifference !== null) {
      amount = amountDifference;
    }

    type === 'income' ? (user.balance += amount) : (user.balance -= amount);

    await user.save();

    return user.balance;
  } catch (error) {
    return error;
  }
};

module.exports = { changeBalance };
