const {
  DB_URL,
  DB_NAME,
  PORT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  MODE,
  BACKEND_APP_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
  GOOGLE_REFRESH_TOKEN,
} = require('./config');
const {
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
  ALLOWED_DOMAINS,
} = require('./constants');
const { connectDatabase } = require('./db.connect');
const { cookieOptions, corsOptions, uploadConfig } = require('./options');

module.exports = {
  DB_URL,
  DB_NAME,
  SALT_COUNT,
  PORT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
  APP_LINK,
  COOKIE_MAX_AGE,
  cookieOptions,
  LANGUAGE_ENUM,
  THEME_ENUM,
  CURRENCY_ENUM,
  PERMISSIONS_ENUM,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  OPERATION_TYPES,
  ALL_CATEGORIES,
  MODE,
  BACKEND_APP_URL,
  connectDatabase,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
  GOOGLE_REFRESH_TOKEN,
  MAX_AVATAR_SIZE,
  TEMP_FOLDER_PATH,
  IMAGE_MIME_TYPES,
  uploadConfig,
  corsOptions,
  ALLOWED_DOMAINS,
};
