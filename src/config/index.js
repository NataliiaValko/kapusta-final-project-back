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
  NODE_ENV,
  BACKEND_APP_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
  GOOGLE_REFRESH_TOKEN,
  FRONTEND_APP_URL,
  TWILIO_ACCOUNT_CID,
  TWILIO_AUTH_TOKEN,
  TWILIO_MESSAGING_SID,
  GCS_TYPE,
  GCS_PROJECT_ID,
  GCS_PRIVATE_KEY_ID,
  GCS_PRIVATE_KEY,
  GCS_CLIENT_EMAIL,
  GCS_CLIENT_ID,
  GCS_AUTH_URI,
  GCS_TOKEN_URI,
  GCS_AUTH_PROVIDER,
  GCS_CLIENT_CERT,
} = require('./config');
const {
  SALT_COUNT,
  ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
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
  MONTHES_ENUM,
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
  NODE_ENV,
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
  FRONTEND_APP_URL,
  TWILIO_ACCOUNT_CID,
  TWILIO_AUTH_TOKEN,
  TWILIO_MESSAGING_SID,
  MONTHES_ENUM,
  GCS_TYPE,
  GCS_PROJECT_ID,
  GCS_PRIVATE_KEY_ID,
  GCS_PRIVATE_KEY,
  GCS_CLIENT_EMAIL,
  GCS_CLIENT_ID,
  GCS_AUTH_URI,
  GCS_TOKEN_URI,
  GCS_AUTH_PROVIDER,
  GCS_CLIENT_CERT,
};
