const { asyncWrapper } = require("./wrapper");
const {
  isErrorOrFalsyValue,
  responseWithError,
  isSameTypeInTransaction,
  getAmountDifference,
} = require("./controller.helpers");

const {
  isDuplicateKeyError,
  getCategories,
  getType,
  formattedDate,
  checkFieldsOnUserUpdate,
  generatePhoneCode,
  prepareYearDate,
} = require("./service.helpers");

const {
  responseErrorOrNext,
  validateObject,
  isValidId,
  isTokenExpiredError,
  isLoggedIn,
  clearTempFolder,
} = require("./middleware.helpers");

const { isMailSent } = require("./mail.helper");
const { phonePattern } = require("./model.helpers");

module.exports = {
  asyncWrapper,
  isDuplicateKeyError,
  isErrorOrFalsyValue,
  responseWithError,
  responseErrorOrNext,
  validateObject,
  isValidId,
  isTokenExpiredError,
  isLoggedIn,
  getCategories,
  getType,
  formattedDate,
  isMailSent,
  isSameTypeInTransaction,
  getAmountDifference,
  checkFieldsOnUserUpdate,
  clearTempFolder,
  generatePhoneCode,
  phonePattern,
  prepareYearDate,
};
