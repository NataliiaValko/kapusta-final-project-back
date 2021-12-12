const { Transaction } = require('../../model');

const getAll = async ({ user: { _id } }, query) => {
  try {
    const searchOptions = { owner: _id };

    Object.keys(query).forEach((key) => {
      if (key !== 'user' && query[key] !== undefined) searchOptions[key] = query[key];
    });

    const transactions = await Transaction.find(searchOptions).populate('owner', 'email');

    let total = 0;

    if ('startDate' in query) {
      const startDate = new Date(query?.startDate).getTime();
      const endDate = new Date(query?.endDate).getTime();

      return transactions
        .reduce((acc, transaction) => {
          const trDate = new Date(transaction.date).getTime();
          if (trDate < endDate && trDate > startDate) {
            total += transaction.amount;
            return [...acc, transaction];
          }
          return [...acc];
        }, [])
        .concat({ total });
    }

    return transactions
      .map((transaction) => {
        total += transaction.amount;
        return transaction;
      })
      .concat({ total });
  } catch (error) {
    return error;
  }
};

module.exports = { getAll };
