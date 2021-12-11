const { Transaction } = require('../../model');

const add = async (body) => {
  try {
    // TODO: add DTO here
    const {
      user: { _id },
      type,
      category,
      comment,
      amount,
      date,
    } = body;

    const transaction = await new Transaction({
      type,
      category,
      comment,
      amount,
      date,
      owner: _id,
    }).populate('owner', 'email');

    await transaction.save();

    return transaction;
  } catch (error) {
    return error;
  }
};

module.exports = { add };
