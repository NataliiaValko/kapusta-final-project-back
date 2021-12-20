const { add } = require('./add.transaction.controller');
const { getAll } = require('./getAll.transaction.controller');
const { remove } = require('./remove.transaction.controller');
const { update } = require('./update.transaction.controller');
const {
  getAllCategories,
} = require('./getAllCategories.transaction.controller');

module.exports = {
  add,
  getAll,
  remove,
  getAllCategories,
  update,
};
