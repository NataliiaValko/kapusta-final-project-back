const joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const {
  LANGUAGE_ENUM,
  THEME_ENUM,
  CURRENCY_ENUM,
  OPERATION_TYPES,
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} = require('../config');
const { EnumDTO } = require('../DTO');
const { phonePattern } = require('../helpers');

const LangEnum = EnumDTO.getSchemaEnum(LANGUAGE_ENUM);
const ThemeEnum = EnumDTO.getSchemaEnum(THEME_ENUM);
const CurrencyEnum = EnumDTO.getSchemaEnum(CURRENCY_ENUM);
const OperationsEnum = EnumDTO.getSchemaEnum(OPERATION_TYPES);
const IncomeEnum = EnumDTO.getSchemaEnum(INCOME_CATEGORIES);
const ExpenseEnum = EnumDTO.getSchemaEnum(EXPENSE_CATEGORIES);

const joiUserRegistrationSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),

  password: PasswordComplexity({
    min: 8,
    max: 12,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  }).required(),

  firstName: joi.string().max(30),
  lastName: joi.string().max(30),
});

const joiUserPasswordChangeSchema = joi.object({
  oldPassword: PasswordComplexity({
    min: 8,
    max: 12,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  }).required(),

  newPassword: PasswordComplexity({
    min: 8,
    max: 12,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
  }).required(),

  user: joi.any(),
});

// TODO: insert REGEXP
const joiUserUpdateSchema = joi.object({
  fullName: {
    firstName: joi.string().max(30),
    lastName: joi.string().max(30),
  },
  phone: joi.string().pattern(phonePattern),
  avatar: joi.string(),

  settings: {
    language: joi.string().valid(...LangEnum),
    theme: joi.string().valid(...ThemeEnum),
    currency: joi.string().valid(...CurrencyEnum),
  },

  balance: joi.number().positive(),

  // THIS IS JUST FOR TESTING!!!
  phoneVerified: joi.any(),

  user: joi.any(),
});

const joiInviteSchema = joi.object({
  friendEmail: joi.string().email({ minDomainSegments: 2 }).required(),

  friendName: joi.string().min(1).max(40).required(),

  user: joi.any(),
});

const joiTransactionSchema = joi.object({
  type: joi
    .string()
    .valid(...OperationsEnum)
    .required(),

  category: joi.alternatives().conditional('type', {
    is: OperationsEnum[0],
    then: joi.valid(...IncomeEnum).required(),
    otherwise: joi.valid(...ExpenseEnum).required(),
  }),

  amount: joi.number().positive().required(),

  date: joi.date().required(),

  comment: joi.string().max(40),

  user: joi.any(),
});

const joiPhoneVerificationSchema = joi.object({
  phone: joi.string().pattern(phonePattern).required(),

  code: joi
    .string()
    .length(4)
    .pattern(/^[0-9]+$/),

  user: joi.any(),
});

module.exports = {
  joiUserRegistrationSchema,
  joiInviteSchema,
  joiUserUpdateSchema,
  joiTransactionSchema,
  joiPhoneVerificationSchema,
  joiUserPasswordChangeSchema,
};
