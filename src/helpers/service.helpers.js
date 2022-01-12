const path = require("path");

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

const prepareAvatarFileName = (oldFileName) => {
  const baseName = path.basename(oldFileName);
  const extname = path.extname(oldFileName);
  const oldFileNameWithoutExt = baseName.replace(extname, "");
  const timeStamp = Date.now();

  return `${oldFileNameWithoutExt}_${timeStamp}${extname}`;
};

module.exports = {
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
};
