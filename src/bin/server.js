const { app } = require('../app');
const { connectDatabase } = require('../config');
const { PORT } = require('../config');
const { generateJSON } = require('./../helpers');

const start = async () => {
  try {
    await connectDatabase();
    await generateJSON();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (e) {
    console.log('Failed to start application with error: ', e.message);
    process.exit(1);
  }
};

start();
