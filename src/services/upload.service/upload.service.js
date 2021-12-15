const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL, GOOGLE_REFRESH_TOKEN } = require('../../config');

const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL);

oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

const googleDrive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});

const filePath = path.join(__dirname, 'tesla.jpg');

console.log('filePath', filePath);

const upload = async () => {
  try {
    const response = await googleDrive.files.create({
      requestBody: {
        name: 'tesla.jpg',
        mimeType: 'image/jpg',
      },
      media: {
        mimeType: 'image/jpg',
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// upload();

module.exports = { upload };
