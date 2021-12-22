const { TransactionService } = require('../../services');
const { isErrorOrFalsyValue } = require('../../helpers');
const { TransactionDTO } = require('../../DTO');

const getSummary = async (req, res, next) => {
  const summary = await TransactionService.getSummary(req.body, req.query);

  if (isErrorOrFalsyValue(summary)) {
    return next(summary);
  }

  const { result, total } = summary;

  res.status(200).json({ message: 'success', data: { result, total } });
};

module.exports = { getSummary };
