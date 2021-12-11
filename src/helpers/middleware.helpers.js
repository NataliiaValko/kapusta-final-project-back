const { BadRequest } = require('http-errors');
const { Types } = require('mongoose');

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
module.exports = { responseErrorOrNext, validateObject, isValidId, isTokenExpiredError };
