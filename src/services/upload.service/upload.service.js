const fs = require("fs");
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const { GCS_PROJECT_ID } = require("./../../config");
const { prepareAvatarFileName } = require("./../../helpers");

const storageBaseUrl = "https://storage.cloud.google.com/";
const bucketName = "kapusta-bucket";

class FileService {
  constructor() {
    this.storage = new Storage({
      project_id: GCS_PROJECT_ID,
      keyFilename: path.join(
        __dirname,
        "../../../rapid-hangar-336920-6e55060c85e7.json"
      ),
    });
    this.bucket = this.storage.bucket(bucketName);
  }

  async renameUserFile(userId, oldFilePath) {
    if (!oldFilePath || !userId) {
      return null;
    }

    const newFileName = prepareAvatarFileName(oldFilePath);
    const newFilePath = `${path.dirname(oldFilePath)}/${newFileName}`;

    await fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        console.log(err);
      }
    });

    return { newFileName, newFilePath };
  }

  async uploadFile(userId, filePath) {
    try {
      const { newFileName, newFilePath } = await this.renameUserFile(
        userId,
        filePath
      );

      await this.bucket.upload(newFilePath, (err) => {
        if (err) {
          console.log("err", err);
        }
      });

      const avatarUrl = `${storageBaseUrl}${bucketName}/${newFileName}`;
      return { avatarUrl, newFilePath };
    } catch (error) {
      return error;
    }
  }
}

const fileService = new FileService();

module.exports = { fileService };
