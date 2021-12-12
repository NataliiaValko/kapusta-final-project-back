const { NotFound, BadRequest } = require('http-errors');

const isErrorOrFalsyValue = (obj) => {
  return obj instanceof Error || obj === null || obj === undefined;
};

const responseWithError = async (obj, next) => {
  if (obj instanceof Error) {
    next(obj);
  }

  if (obj === null) {
    next(new NotFound(`Not found`));
  }
};

const isSameTypeInTransaction = (prevTransactionType, newTransactionType) => prevTransactionType === newTransactionType;

const getAmountDifference = (oldAmount, newAmount) => -(oldAmount - newAmount);

module.exports = {
  isErrorOrFalsyValue,
  responseWithError,
  isSameTypeInTransaction,
  getAmountDifference,
};
