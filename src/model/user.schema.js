const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { EnumDTO } = require('../DTO');
const { SALT_COUNT, LANGUAGE_ENUM, THEME_ENUM, CURRENCY_ENUM, PERMISSIONS_ENUM } = require('../config');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phone: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
    fullName: {
      firstName: {
        type: String,
        default: null,
      },
      lastName: {
        type: String,
        default: null,
      },
    },
    refreshToken: {
      type: String,
      default: null,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    securityIssue: {
      type: Boolean,
      default: false,
    },
    isBalanceSetted: {
      type: Boolean,
      default: false,
    },
    permissions: {
      type: String,
      enum: EnumDTO.getSchemaEnum(PERMISSIONS_ENUM),
      default: 'user',
    },
    invitedFriends: {
      type: Array,
      default: [],
    },
    balance: {
      type: Number,
      default: 0,
    },
    settings: {
      language: {
        type: String,
        enum: EnumDTO.getSchemaEnum(LANGUAGE_ENUM),
        default: 'ru',
      },
      theme: {
        type: String,
        enum: EnumDTO.getSchemaEnum(THEME_ENUM),
        default: 'light',
      },
      currency: {
        type: String,
        enum: EnumDTO.getSchemaEnum(CURRENCY_ENUM),
        default: 'UAH',
      },
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_COUNT));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model('user', userSchema);

module.exports = { User };
