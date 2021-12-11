const mongoose = require('mongoose');
const { DB_NAME, DB_URL } = require('./config');

const connectDatabase = async () => {
  await mongoose.connect(DB_URL, { dbName: DB_NAME });
};

module.exports = { connectDatabase };
