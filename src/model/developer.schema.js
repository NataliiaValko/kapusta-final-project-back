const { Schema, model } = require('mongoose');

const developerSchema = new Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  avatarUrl: {
    type: String,
    required: true,
  },
  role: [
    {
      type: String,
      required: true,
    },
  ],
  email: {
    type: String,
  },
  linkedinLink: {
    type: String,
  },
  gitLink: {
    type: String,
  },
});

const Developer = model('developer', developerSchema);
module.exports = { Developer };
