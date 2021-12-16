const UserService = require("./user.services");
const { mailService } = require("./mail.service/mail.service");
const TokenService = require("./token.service");
const TransactionService = require("./transaction.service");
const { fileService } = require("./upload.service");

module.exports = {
  UserService,
  mailService,
  TokenService,
  TransactionService,
  fileService,
};
