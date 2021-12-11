const { add } = require('./add.transaction.service');
const { getAll } = require('./getAll.transaction.service');
const { remove } = require('./remove.transaction.service');

module.exports = { add, getAll, remove };
