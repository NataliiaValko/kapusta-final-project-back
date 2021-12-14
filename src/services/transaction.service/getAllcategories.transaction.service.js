const { Transaction } = require('../../model');
const getAllcategories = async ({ user: { _id } }, query) => {
  try {
    const { type } = query;
    const startDate = new Date(query.startDate).getTime();
    const endDate = new Date(query.endDate).getTime();
    const searchOptions = { owner: _id };
    const owner = await Transaction.find(searchOptions);
    const data = owner.reduce((acc, transaction) => {
      const date = transaction.date.getTime();
      if (transaction.type === type && date >= startDate && date <= endDate) {
        const { category, amount } = transaction;
        if (acc.find((el) => Object.keys(el)[0] === category)) {
          const item = acc.find((el) => Object.keys(el)[0] === category);
          console.log(item);
          item[category] += amount;
        } else if (category) {
          acc.push({ [category]: amount });
        }
      }
      return acc;
    }, []);
    return data;
  } catch (error) {}
};

module.exports = { getAllcategories };
