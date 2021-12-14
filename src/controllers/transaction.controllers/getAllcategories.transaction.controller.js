const { TransactionService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers');

const getAllcategories = async (req, res, next) => {
  const transactions = await TransactionService.getAllcategories(
    req.body,
    req.query
  );

  if (isErrorOrFalsyValue(transactions)) {
    return next(transactions);
  }
  res.status(200).json({ message: 'success', data: { transactions } });
};

module.exports = { getAllcategories };
