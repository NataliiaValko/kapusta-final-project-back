const { responseErrorOrNext, validateObject } = require("../helpers");
const { joiTransactionSchema } = require("../model");

const transactionValidation = async (req, res, next) => {
  const { error } = validateObject(req.body, joiTransactionSchema);

  responseErrorOrNext(error, res, next);
};

module.exports = {
  transactionValidation,
};
