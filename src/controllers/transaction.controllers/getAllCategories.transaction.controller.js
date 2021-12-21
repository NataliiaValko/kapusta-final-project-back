const { TransactionService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers');

const getAllCategories = async (req, res, next) => {
  const transactions = await TransactionService.getAllCategories(
    req.body,
    req.query
  );

  if (isErrorOrFalsyValue(transactions)) {
    return next(transactions);
  }
  res.status(200).json({ message: 'success', data: transactions });
};

module.exports = { getAllCategories };
