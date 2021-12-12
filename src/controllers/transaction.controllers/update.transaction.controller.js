const { TransactionService, UserService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers');
const { TransactionDTO } = require('../../DTO');

const update = async (req, res, next) => {
  const { transaction, amountDifference } = await TransactionService.update(req.body, req.params);

  if (isErrorOrFalsyValue(transaction)) {
    return next(transaction);
  }

  const data = TransactionDTO.getTransactionInfo(transaction);
  const balance = await UserService.changeBalance(data.transaction, false, amountDifference);

  res.status(201).json({ message: 'success', data: { ...data, balance } });
};

module.exports = { update };
