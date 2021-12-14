const userController = require('./user.controllers');
const developerController = require('./developers.controllers');
const transactionController = require('./transaction.controllers');
const googleController = require('./googleAuth.controllers');

module.exports = {
  userController,
  developerController,
  transactionController,
  googleController,
};
