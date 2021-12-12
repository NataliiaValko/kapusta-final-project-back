const { BadRequest } = require('http-errors');
const { isSameTypeInTransaction, getAmountDifference } = require('../../helpers');
const { Transaction } = require('../../model');

const update = async (body, params) => {
  try {
    // TODO: add DTO here
    const { transactionId } = params;
    const transaction = await Transaction.findById(transactionId).populate('owner', 'email');

    if (!isSameTypeInTransaction(body.type, transaction.type)) {
      return new BadRequest('Transaction type cannot be changed');
    }

    const amountDifference = getAmountDifference(transaction?.amount, body?.amount);

    Object.keys(body).forEach((key) => {
      if (key !== 'user' && body[key] !== undefined) transaction[key] = body[key];
    });

    await transaction.save();

    return { transaction, amountDifference };
  } catch (error) {
    return error;
  }
};

module.exports = { update };
