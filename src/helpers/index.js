const { asyncWrapper } = require('./wrapper');
const {
  isErrorOrFalsyValue,
  responseWithError,
  isSameTypeInTransaction,
  getAmountDifference,
} = require('./controller.helpers');

const {
  isDuplicateKeyError,
  getCategories,
  formattedDate,
  checkFieldsOnUserUpdate,
  generatePhoneCode,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthIndexByDate,
  initializeSummary,
} = require('./service.helpers');

const {
  responseErrorOrNext,
  validateObject,
  isValidId,
  isTokenExpiredError,
  isLoggedIn,
  clearTempFolder,
} = require('./middleware.helpers');

const { isMailSent } = require('./mail.helper');
const { phonePattern } = require('./model.helpers');

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
  formattedDate,
  isMailSent,
  isSameTypeInTransaction,
  getAmountDifference,
  checkFieldsOnUserUpdate,
  clearTempFolder,
  generatePhoneCode,
  phonePattern,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthIndexByDate,
  initializeSummary,
};
