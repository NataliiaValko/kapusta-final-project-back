const isDuplicateKeyError = (error) => error.code === 11000;

const getCategories = (array, category) => {
  return array.find((el) => Object.keys(el)[0] === category);
};

const formattedDate = (date) => new Date(date).getTime();

const checkFieldsOnUserUpdate = (updateUserData, key) =>
  updateUserData[key] !== undefined &&
  key !== "user" &&
  key !== "settings" &&
  key !== "fullName";

module.exports = {
  isDuplicateKeyError,
  getCategories,
  formattedDate,
  checkFieldsOnUserUpdate,
};
