const { Schema, model } = require('mongoose');
const { EnumDTO } = require('../DTO');

const { OPERATION_TYPES, ALL_CATEGORIES } = require('../config');

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      enum: EnumDTO.getSchemaEnum(OPERATION_TYPES),
      required: true,
    },
    category: {
      type: String,
      enum: EnumDTO.getSchemaEnum(ALL_CATEGORIES),
      required: true,
    },
    comment: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const Transaction = model('transaction', transactionSchema);

module.exports = { Transaction };
