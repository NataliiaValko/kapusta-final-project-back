const { add } = require('./add.transaction.service');
const { getAll } = require('./getAll.transaction.service');
const { remove } = require('./remove.transaction.service');
const { update } = require('./update.transaction.service');

module.exports = { add, getAll, remove, update };
