const { BadRequest } = require('http-errors');
const { Types } = require('mongoose');
const fs = require('fs');
const path = require('path');

const responseErrorOrNext = (error, _, next) => {
  if (error) {
    const { message } = error.details[0];
    next(new BadRequest(message));
  }

  next();
};

const isValidId = (id) => Types.ObjectId.isValid(id);

const isTokenExpiredError = (error) => error.toString().includes('TokenExpiredError');

const validateObject = (contact, joiSchema, requiredFields = []) => {
  let objectSchema = Object.create(joiSchema);

  objectSchema = objectSchema.fork(requiredFields, (field) => field.required());

  return objectSchema.validate(contact);
};

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

const clearTempFolder = async (folder) => {
  await fs.readdir(folder, async (err, files) => {
    if (err) throw err;

    for (const file of files) {
      await fs.unlink(path.join(folder, file), (err) => {
        if (err) throw err;
      });
    }
  });
};

module.exports = {
  responseErrorOrNext,
  validateObject,
  isValidId,
  isTokenExpiredError,
  isLoggedIn,
  clearTempFolder,
};
