const dotenv = require('dotenv');
dotenv.config();

const {
  MODE,
  BACKEND_APP_URL,
  DB_URL,
  DB_NAME,
  PORT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} = process.env;

module.exports = {
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
};
