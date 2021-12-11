const getTransactionInfo = (transaction) => {
  const {
    _id,
    type,
    category,
    comment,
    amount,
    date,
    owner: { email },
  } = transaction;
  return {
    transaction: {
      _id,
      type,
      category,
      comment,
      amount,
      date,
      owner: { email },
    },
  };
};

module.exports = {
  getTransactionInfo,
};
