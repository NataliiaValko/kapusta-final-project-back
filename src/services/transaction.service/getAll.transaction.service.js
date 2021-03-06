const { Transaction } = require("../../model");
const { formattedDate } = require("../../helpers");

const getAll = async ({ user: { _id, balance, isBalanceSetted } }, query) => {
  try {
    const searchOptions = { owner: _id };

    Object.keys(query).forEach((key) => {
      if (key !== "user" && query[key] !== undefined)
        searchOptions[key] = query[key];
    });

    const transactions = await Transaction.find(searchOptions).populate(
      "owner",
      "email"
    );

    let total = 0;

    if ("startDate" in query) {
      const { startDate } = query;
      const endDate = query?.endDate || Date.now();

      return transactions
        .reduce((acc, transaction) => {
          if (
            formattedDate(transaction.date) < formattedDate(endDate) + 1 &&
            formattedDate(transaction.date) > formattedDate(startDate) - 1
          ) {
            transaction.type === "income"
              ? (total += transaction.amount)
              : (total -= transaction.amount);
            return [...acc, transaction];
          }

          return [...acc];
        }, [])
        .concat({ total, balance, isBalanceSetted });
    }

    return transactions
      .map((transaction) => {
        transaction.type === "income"
          ? (total += transaction.amount)
          : (total -= transaction.amount);

        return transaction;
      })
      .concat({ total, balance, isBalanceSetted });
  } catch (error) {
    return error;
  }
};

module.exports = { getAll };
