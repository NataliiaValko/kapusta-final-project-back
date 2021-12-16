const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
  GOOGLE_REFRESH_TOKEN,
} = require("../../config");

const filePath = path.join(__dirname, "tesla.jpg");

class FileService {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URL
    );
    this.oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });
    this.drive = google.drive({
      version: "v3",
      auth: this.oauth2Client,
    });
  }

  async generatePublicUrl(fileId) {
    try {
      await this.drive.permissions.create({
        fileId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });

      const result = await this.drive.files.get({
        fileId,
        fields: "webContentLink",
      });

      if ("webContentLink" in result.data) {
        const { webContentLink } = result.data;

        const searchedSubstr = "&export=download";
        if (webContentLink.includes(searchedSubstr)) {
          const imageUrl = webContentLink.replace(searchedSubstr, "");
          console.log(imageUrl);
        }
      }
    } catch (error) {
      return error;
    }
  }

  async createFolder(userId) {
    try {
      const response = await this.drive.files.create({
        resource: {
          name: userId,
          mimeType: "application/vnd.google-apps.folder",
        },
        fields: "id, name",
      });

      console.log("createFolder", response.data);

      return "id" in response.data ? response.data.id : null;
    } catch (error) {
      return error;
    }
  }

  async searchFolder(userId) {
    try {
      const response = await this.drive.files.list({
        q: `mimeType='application/vnd.google-apps.folder' and name='${userId}'`,
        fields: "files(id, name)",
      });

      console.log("search", response.data);

      return response.data.files ? response.data.files[0] : null;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFile(userId, filePath) {
    try {
      let newFolder = {};
      const existedFolder = await this.searchFolder(userId);
      // console.log("folder", existedFolder);

      if (!existedFolder) {
        newFolder.id = await this.createFolder(userId);
        // console.log("folder NOT exist");
      }

      const response = await googleDrive.files.create({
        requestBody: {
          name: "tesla.jpg",
          mimeType: "image/jpg",
          parents: [newFolder.id || existedFolder.id],
        },
        media: {
          mimeType: "image/jpg",
          body: fs.createReadStream(filePath),
        },
      });

      console.log("response file", response.data);

      return "id" in response.data
        ? await this.generatePublicUrl(response.data.id)
        : null;
    } catch (error) {
      return error;
    }
  }
}

// const oauth2Client = new google.auth.OAuth2(
//   GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET,
//   GOOGLE_REDIRECT_URL
// );

// oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

// const googleDrive = google.drive({
//   version: "v3",
//   auth: oauth2Client,
// });

// const generatePublicUrl = async (fileId) => {
//   try {
//     await googleDrive.permissions.create({
//       fileId,
//       requestBody: {
//         role: "reader",
//         type: "anyone",
//       },
//     });

//     const result = await googleDrive.files.get({
//       fileId,
//       fields: "webContentLink",
//     });

//     if ("webContentLink" in result.data) {
//       const { webContentLink } = result.data;

//       const searchedSubstr = "&export=download";
//       if (webContentLink.includes(searchedSubstr)) {
//         const imageUrl = webContentLink.replace(searchedSubstr, "");
//         console.log(imageUrl);
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const createFolder = async (userId) => {
//   try {
//     const folderMetaData = {
//       name: userId,
//       mimeType: "application/vnd.google-apps.folder",
//     };

//     const response = await googleDrive.files.create({
//       resource: folderMetaData,
//       fields: "id, name",
//     });

//     console.log("createFolder", response.data);

//     return "id" in response.data ? response.data.id : null;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const searchFolder = async (userId) => {
//   try {
//     const response = await googleDrive.files.list({
//       q: `mimeType='application/vnd.google-apps.folder' and name='${userId}'`,
//       fields: "files(id, name)",
//     });

//     console.log("search", response.data);

//     return response.data.files ? response.data.files[0] : null;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const uploadFile = async (userId, filePath) => {
//   try {
//     let newFolder = {};
//     const existedFolder = await searchFolder(userId);
//     // console.log("folder", existedFolder);

//     if (!existedFolder) {
//       newFolder.id = await createFolder(userId);
//       // console.log("folder NOT exist");
//     }

//     const response = await googleDrive.files.create({
//       requestBody: {
//         name: "tesla.jpg",
//         mimeType: "image/jpg",
//         parents: [newFolder.id || existedFolder.id],
//       },
//       media: {
//         mimeType: "image/jpg",
//         body: fs.createReadStream(filePath),
//       },
//     });

//     console.log("response file", response.data);

//     return "id" in response.data
//       ? await generatePublicUrl(response.data.id)
//       : null;
//   } catch (error) {
//     return error;
//   }
// };

// uploadFile();

const fileService = new FileService();

module.exports = { fileService };
