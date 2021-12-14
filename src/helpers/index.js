const { asyncWrapper } = require('./wrapper');
const {
  isErrorOrFalsyValue,
  responseWithError,
} = require('./controller.helpers');
const {
  isDuplicateKeyError,
  getCategories,
  formattedDate,
} = require('./service.helpers');
const {
  responseErrorOrNext,
  validateObject,
  isValidId,
  isTokenExpiredError,
  isLoggedIn,
} = require('./middleware.helpers');

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
};
