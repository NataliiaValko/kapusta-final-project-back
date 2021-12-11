const { responseErrorOrNext, validateObject } = require('../helpers');
const { joiUserRegistrationSchema, joiInviteSchema, joiUserUpdateSchema } = require('../model');

const userValidation = async (req, res, next) => {
  const requiredFields = ['email', 'password'];

  const { error } = validateObject(req.body, joiUserRegistrationSchema, requiredFields);

  responseErrorOrNext(error, res, next);
};

const userEmailValidation = async (req, res, next) => {
  const { error } = validateObject(req.body, joiUserRegistrationSchema, ['email']);

  responseErrorOrNext(error, res, next);
};

const userInvitationValidation = async (req, res, next) => {
  const { error } = validateObject(req.body, joiInviteSchema, ['friendEmail', 'friendName']);

  responseErrorOrNext(error, res, next);
};

const userUpdateValidation = async (req, res, next) => {
  const { error } = validateObject(req.body, joiUserUpdateSchema);

  responseErrorOrNext(error, res, next);
};

module.exports = {
  userValidation,
  userEmailValidation,
  userInvitationValidation,
  userUpdateValidation,
};
