const { Transaction } = require('../../model');
const { getCategories, formattedDate } = require('../../helpers');
const getAllCategories = async ({ user: { _id } }, query) => {
  try {
    const { type, startDate, endDate } = query;
    const searchOptions = { owner: _id };
    const transactionsByOwner = await Transaction.find(searchOptions);
    const data = transactionsByOwner.reduce((acc, transaction) => {
      const date = formattedDate(transaction.date);
      if (transaction.type === type && date >= formattedDate(startDate) && date <= formattedDate(endDate)) {
        const { category, amount } = transaction;
        getCategories(acc, category)
          ? (getCategories(acc, category)[category] += amount)
          : acc.push({ [category]: amount });
      }
      return acc;
    }, []);
    return data;
  } catch (error) {}
};

module.exports = { getAllCategories };
