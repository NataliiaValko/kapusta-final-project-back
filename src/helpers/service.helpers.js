const isDuplicateKeyError = (error) => error.code === 11000;

const formattedDate = (date) => new Date(date).getTime();

const getCategories = (array, category) => {
  return array.find((el) => Object.values(el)[1] === category);
};

const checkFieldsOnUserUpdate = (updateUserData, key) =>
  updateUserData[key] !== undefined && key !== 'user' && key !== 'settings' && key !== 'fullName';

const generatePhoneCode = () => {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
};

const getFirstDayOfMonth = (year, month) => {
  const date = new Date(year, month, 1);
  return formattedDate(date.toString());
};

const getLastDayOfMonth = (year, month) => {
  const date = new Date(year, month + 2, -1);
  return formattedDate(date.toString());
};

const getMonthIndexByDate = (date) => {
  const newDate = new Date(date);
  return newDate.getMonth();
};

const initializeSummary = (monthesArr, type) =>
  monthesArr.map((month) => {
    return {
      month,
      type,
      total: 0,
    };
  });

module.exports = {
  isDuplicateKeyError,
  getCategories,
  formattedDate,
  checkFieldsOnUserUpdate,
  generatePhoneCode,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getMonthIndexByDate,
  initializeSummary,
};
