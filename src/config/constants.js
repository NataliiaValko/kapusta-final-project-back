const path = require('path');

const { ACCESS_TOKEN_LIFETIME } = require('./config');
const SALT_COUNT = 10;
const ACCESS_EXPIRES_IN = ACCESS_TOKEN_LIFETIME || '1h';
const REFRESH_EXPIRES_IN = '30d';
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
const APP_LINK = 'https://cabbage-project.netlify.app';
const LANGUAGE_ENUM = [{ EN: 'en' }, { RU: 'ru' }, { UA: 'ua' }];
const THEME_ENUM = [{ DARK: 'dark' }, { LIGHT: 'light' }];
const CURRENCY_ENUM = [{ UAH: 'UAH' }, { USD: 'USD' }, { EUR: 'EUR' }, { RUB: 'RUB' }, { ZLT: 'ZLT' }];
const PERMISSIONS_ENUM = [{ USER: 'user' }, { SUPPORT: 'support' }, { ADMIN: 'admin' }];
const EXPENSE_CATEGORIES = [
  { PRODUCTS: 'products' },
  { ALCOHOL: 'alcohol' },
  { ENTERTAINMENT: 'entertainment' },
  { HEALTHY: 'healthy' },
  { TRANSPORT: 'transport' },
  { HOME: 'home' },
  { TECHNIC: 'technic' },
  { COMMUNICATION: 'communication' },
  { HOBBY: 'hobby' },
  { EDUCATION: 'education' },
  { OTHER: 'other' },
];
const INCOME_CATEGORIES = [{ SALARY: 'salary' }, { ADDITIONAL: 'additional' }];
const OPERATION_TYPES = [{ INCOME: 'income' }, { EXPENSE: 'expense' }];
const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES];
const MAX_AVATAR_SIZE = 4_096_000;
const TEMP_FOLDER_PATH = path.join(__dirname, '../../', 'temp/avatars');
const IMAGE_MIME_TYPES = ['image/gif', 'image/jpeg', 'image/png', 'image/tiff', 'image/pjpeg'];

module.exports = {
  SALT_COUNT,
  ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
  APP_LINK,
  COOKIE_MAX_AGE,
  LANGUAGE_ENUM,
  THEME_ENUM,
  CURRENCY_ENUM,
  PERMISSIONS_ENUM,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  OPERATION_TYPES,
  ALL_CATEGORIES,
  MAX_AVATAR_SIZE,
  TEMP_FOLDER_PATH,
  IMAGE_MIME_TYPES,
};
