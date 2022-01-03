const { responseErrorOrNext, validateObject } = require('../helpers');
const {
  joiUserRegistrationSchema,
  joiInviteSchema,
  joiUserUpdateSchema,
  joiPhoneVerificationSchema,
  joiUserPasswordChangeSchema,
} = require('../model');

const userValidation = async (req, res, next) => {
  const requiredFields = ['email', 'password'];

  const { error } = validateObject(req.body, joiUserRegistrationSchema, requiredFields);

  responseErrorOrNext(error, res, next);
};

const userPasswordsValidation = async (req, res, next) => {
  const requiredFields = ['oldPassword', 'newPassword'];

  const { error } = validateObject(req.body, joiUserPasswordChangeSchema, requiredFields);

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

const userPhoneVerificationValidation = async (req, res, next) => {
  const { error } = validateObject(req.body, joiPhoneVerificationSchema);

  responseErrorOrNext(error, res, next);
};

module.exports = {
  userValidation,
  userEmailValidation,
  userInvitationValidation,
  userUpdateValidation,
  userPhoneVerificationValidation,
  userPasswordsValidation,
};
