const { BadRequest } = require('http-errors');
const { User } = require('../../model');
const { smsService } = require('../sms.service/sms.service');
const { generatePhoneCode } = require('../../helpers');

const verifyPhone = async (_id, phone, code) => {
  try {
    const { phoneVerified } = await User.findById(_id);

    if (phoneVerified) {
      return new BadRequest('Phone number already verified');
    }

    if (code === undefined) {
      const verificationCode = generatePhoneCode();

      await User.findByIdAndUpdate(
        _id,
        {
          verificationCode,
        },
        { new: true }
      );

      const res = await smsService.sendCodeInMessage(phone, verificationCode);

      return res;
    }

    const { verificationCode } = await User.findById(_id);

    return verificationCode.toString() !== code.toString()
      ? new BadRequest('Wrong verification code')
      : await User.findByIdAndUpdate(
          _id,
          {
            phoneVerified: true,
          },
          { new: true }
        );
  } catch (error) {
    return error;
  }
};

module.exports = { verifyPhone };
