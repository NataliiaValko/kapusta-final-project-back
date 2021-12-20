const { Transaction } = require('../../model');
const { formattedDate, getCategories } = require('../../helpers');

const getAllCategories = async ({ user: { _id } }, query) => {
  try {
    const { startDate, endDate } = query;
    const searchOptions = { owner: _id };
    const transactionsByOwner = await Transaction.find(searchOptions);
    const data = transactionsByOwner.reduce((acc, transaction) => {
      const { type, category, amount, comment } = transaction;
      const date = formattedDate(transaction.date);
      if (date >= formattedDate(startDate) && date <= formattedDate(endDate)) {
        if (getCategories(acc, category)) {
          const item = getCategories(acc, category);
          item.category = category;
          item.total += amount;
          item.details[comment]
            ? (item.details[comment] += amount)
            : (item.details[comment] = amount);
        } else if (type) {
          acc.push({
            type: type,
            category: category,
            total: amount,
            details: { [comment]: amount },
          });
        }
      }
      return [...acc];
    }, []);
    return data;
  } catch (error) {}
};

module.exports = { getAllCategories };
