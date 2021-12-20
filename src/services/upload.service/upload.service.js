const { google } = require('googleapis');
const fs = require('fs');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL, GOOGLE_REFRESH_TOKEN } = require('../../config');

class FileService {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL);
    this.oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
    this.drive = google.drive({
      version: 'v3',
      auth: this.oauth2Client,
    });
  }

  async generatePublicUrl(fileId) {
    try {
      await this.drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      const result = await this.drive.files.get({
        fileId,
        fields: 'webContentLink',
      });

      if ('webContentLink' in result.data) {
        const { webContentLink } = result.data;

        const searchedSubstr = '&export=download';
        if (webContentLink.includes(searchedSubstr)) {
          const imageUrl = webContentLink.replace(searchedSubstr, '');
          return imageUrl;
        }
      }

      return null;
    } catch (error) {
      return error;
    }
  }

  async createFolder(userId) {
    try {
      const response = await this.drive.files.create({
        resource: {
          name: userId,
          mimeType: 'application/vnd.google-apps.folder',
        },
        fields: 'id, name',
      });

      return 'id' in response.data ? response.data.id : null;
    } catch (error) {
      return error;
    }
  }

  async searchFolder(userId) {
    try {
      const response = await this.drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and name='${userId}'`,
        fields: 'files(id, name)',
      });

      return response.data.files ? response.data.files[0] : null;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFile(userId, filePath) {
    try {
      let newFolder = {};
      const existedFolder = await this.searchFolder(userId);

      if (!existedFolder) {
        newFolder.id = await this.createFolder(userId);
      }

      const response = await this.drive.files.create({
        requestBody: {
          name: userId,
          mimeType: 'image/jpg',
          parents: [newFolder.id || existedFolder.id],
        },
        media: {
          mimeType: 'image/jpg',
          body: fs.createReadStream(filePath),
        },
      });

      return 'id' in response.data ? await this.generatePublicUrl(response.data.id) : null;
    } catch (error) {
      return error;
    }
  }
}

const fileService = new FileService();

module.exports = { fileService };
