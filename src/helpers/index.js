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
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthIndexByDate,
  initializeSummary,
  prepareAvatarFileName,
} = require("./service.helpers");

const {
  responseErrorOrNext,
  validateObject,
  isValidId,
  isTokenExpiredError,
  isLoggedIn,
  clearTempFolder,
} = require("./middleware.helpers");
const { generateJSON } = require("./generateJSON.helper");

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
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthIndexByDate,
  initializeSummary,
  generateJSON,
  prepareAvatarFileName,
};
