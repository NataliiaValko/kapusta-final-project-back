const { Transaction } = require('../../model');
const { MONTHES_ENUM } = require('../../config');
const {
  formattedDate,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthIndexByDate,
  initializeSummary,
} = require('../../helpers');

const getSummary = async ({ user: _id }, query) => {
  try {
    if (!query?.year || !query?.type) {
      return null;
    }

    const summary = initializeSummary(MONTHES_ENUM, query.type);
    const transactionsByOwner = await Transaction.find({ owner: _id });
    let total = 0;

    const result = transactionsByOwner.reduce(
      (acc, transaction) => {
        const { type, amount, date } = transaction;
        const monthIndex = getMonthIndexByDate(date);
        const startDate = getFirstDayOfMonth(query.year, monthIndex);
        const endDate = getLastDayOfMonth(query.year, monthIndex);

        if (type === query.type && formattedDate(date) >= startDate && formattedDate(date) <= endDate) {
          summary[monthIndex].total += amount;
          total += amount;
        }

        return [...acc];
      },
      [...summary]
    );
    return { result, total };
  } catch (error) {
    return error;
  }
};

module.exports = { getSummary };
