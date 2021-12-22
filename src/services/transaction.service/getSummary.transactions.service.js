const { Transaction } = require("../../model");
const {
  formattedDate,
  getCategories,
  getType,
  prepareYearDate,
} = require("../../helpers");
const { MONTHES_ENUM } = require("../../config");

const getSummary = async ({ user: { _id } }, query) => {
  try {
    const { year, type } = query;

    const startYear = prepareYearDate(Number(year));
    const endYear = prepareYearDate(Number(year) + 1);

    const searchOptions = { owner: _id };
    const transactionsByOwner = await Transaction.find(searchOptions);

    const data = transactionsByOwner.reduce((acc, transaction) => {
      const { type, category, amount, comment } = transaction;
      const date = formattedDate(transaction.date);
      if (
        date >= formattedDate(startYear) - 1 &&
        date <= formattedDate(endYear) + 1
      ) {
        if (getType(acc, type)) {
          const item = getCategories(acc, category);
          item.total += amount;
          item.details[comment]
            ? (item.details[comment] += amount)
            : (item.details[comment] = amount);
        } else if (type) {
          acc.push({
            month: type,
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

module.exports = { getSummary };
