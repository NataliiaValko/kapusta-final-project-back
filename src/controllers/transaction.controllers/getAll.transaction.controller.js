const { TransactionService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers');
const { TransactionDTO } = require('../../DTO');

const getAll = async (req, res, next) => {
  const transactions = await TransactionService.getAll(req.body, req.query);

  if (isErrorOrFalsyValue(transactions)) {
    return next(transactions);
  }

  // TODO: add DTO here
  //   const data = TransactionDTO.getTransactionInfo(transaction);

  res.status(200).json({ message: 'success', data: { transactions } });
};

module.exports = { getAll };
