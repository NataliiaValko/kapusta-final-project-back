const { Transaction } = require('../../model');
const { formattedDate } = require('../../helpers');

const getAll = async ({ user: { _id, balance } }, query) => {
  try {
    const searchOptions = { owner: _id };

    Object.keys(query).forEach((key) => {
      if (key !== 'user' && query[key] !== undefined) searchOptions[key] = query[key];
    });

    const transactions = await Transaction.find(searchOptions).populate('owner', 'email');

    let total = 0;

    if ('startDate' in query) {
      const { startDate } = query;
      const endDate = query?.endDate || Date.now();

      return transactions
        .reduce((acc, transaction) => {
          if (
            formattedDate(transaction.date) < formattedDate(endDate) &&
            formattedDate(transaction.date) > formattedDate(startDate)
          ) {
            transaction.type === 'income' ? (total += transaction.amount) : (total -= transaction.amount);
            return [...acc, transaction];
          }

          return [...acc];
        }, [])
        .concat({ total, balance });
    }

    return transactions
      .map((transaction) => {
        transaction.type === 'income' ? (total += transaction.amount) : (total -= transaction.amount);

        return transaction;
      })
      .concat({ total, balance });
  } catch (error) {
    return error;
  }
};

module.exports = { getAll };
