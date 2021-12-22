const isDuplicateKeyError = (error) => error.code === 11000;

const formattedDate = (date) => new Date(date).getTime();

const getCategories = (array, category) => {
  return array.find((el) => Object.values(el)[1] === category);
};

const getType = (array, type) => {
  return array.find((el) => Object.values(el)[1] === type);
};

const checkFieldsOnUserUpdate = (updateUserData, key) =>
  updateUserData[key] !== undefined &&
  key !== "user" &&
  key !== "settings" &&
  key !== "fullName";

const generatePhoneCode = () => {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
};

const prepareYearDate = (year) => {
  return `${year}-01-01`;
};

module.exports = {
  isDuplicateKeyError,
  getCategories,
  getType,
  formattedDate,
  checkFieldsOnUserUpdate,
  generatePhoneCode,
  prepareYearDate,
};
