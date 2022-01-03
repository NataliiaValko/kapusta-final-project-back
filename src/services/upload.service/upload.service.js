const fs = require('fs');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const { GCS_PROJECT_ID } = require('./../../config');

const storageBaseUrl = 'https://storage.googleapis.com/';
const bucketName = 'kapusta-bucket';

class FileService {
  constructor() {
    this.storage = new Storage({
      project_id: GCS_PROJECT_ID,
      keyFilename: path.join(__dirname, '../../../rapid-hangar-336920-6e55060c85e7.json'),
    });
    this.bucket = this.storage.bucket(bucketName);
  }

  async renameUserFile(userId, oldFileName) {
    if (!oldFileName || !userId) {
      return null;
    }

    const newFileName = userId + path.extname(oldFileName);
    const newFilePath = path.dirname(oldFileName) + '/' + newFileName;

    await fs.rename(oldFileName, newFilePath, (err) => {
      if (err) {
        console.log(err);
      }
    });

    return { newFileName, newFilePath };
  }

  async uploadFile(userId, filePath) {
    try {
      const { newFileName, newFilePath } = await this.renameUserFile(userId, filePath);

      await this.bucket.upload(newFilePath, (err) => {
        if (err) {
          console.log('err', err);
        }
      });

      const avatarUrl = `${storageBaseUrl}${bucketName}/` + newFileName;
      return { avatarUrl, newFilePath };
    } catch (error) {
      return error;
    }
  }
}

const fileService = new FileService();

module.exports = { fileService };
