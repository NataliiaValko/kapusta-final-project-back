const isDuplicateKeyError = (error) => error.code === 11000;

const formattedDate = (date) => new Date(date).getTime();

const getCategories = (array, category) => {
  return array.find((el) => Object.values(el)[1] === category);
};

const checkFieldsOnUserUpdate = (updateUserData, key) =>
  updateUserData[key] !== undefined &&
  key !== 'user' &&
  key !== 'settings' &&
  key !== 'fullName';

module.exports = {
  isDuplicateKeyError,
  getCategories,
  formattedDate,
  checkFieldsOnUserUpdate,
};
