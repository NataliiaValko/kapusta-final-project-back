const fs = require("fs");
const path = require("path");
const {
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
} = require("./../config");

const fileName = "rapid-hangar-336920-6e55060c85e7.json";
const filePath = path.join(__dirname, `../../${fileName}`);

const data = {
  type: GCS_TYPE,
  project_id: GCS_PROJECT_ID,
  private_key_id: GCS_PRIVATE_KEY_ID,
  private_key: GCS_PRIVATE_KEY,
  client_email: GCS_CLIENT_EMAIL,
  client_id: GCS_CLIENT_ID,
  auth_uri: GCS_AUTH_URI,
  token_uri: GCS_TOKEN_URI,
  auth_provider_x509_cert_url: GCS_AUTH_PROVIDER,
  client_x509_cert_url: GCS_CLIENT_CERT,
};

const generateJSON = async () => {
  await fs.stat(filePath, async (err) => {
    if (err) {
      const stringifiedData = JSON.stringify(data).replace(/\\\\/g, "\\");
      await fs.writeFile(filePath, stringifiedData, {}, (err) => {
        if (err) {
          console.log("error: ", err);
        }
      });
    }
  });
};

module.exports = { generateJSON };
