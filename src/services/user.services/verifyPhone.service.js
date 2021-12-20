const { BadRequest } = require('http-errors');
const { User } = require('../../model');
const { smsService } = require('../sms.service/sms.service');
const { generatePhoneCode } = require('../../helpers');

const verifyPhone = async (_id, phone, code) => {
  try {
    if (!code) {
      const verificationCode = generatePhoneCode();

      await User.findByIdAndUpdate(
        _id,
        {
          verificationCode,
        },
        { new: true }
      );

      const res = await smsService.sendCodeInMessage(phone, code);
      console.log('sms res', res);

      return res;
    }

    const { verificationCode } = await User.findById(_id);

    return verificationCode.toString() !== code.toString()
      ? new BadRequest('Wrong verification code')
      : { success: true };
  } catch (error) {
    return error;
  }
};

module.exports = { verifyPhone };
