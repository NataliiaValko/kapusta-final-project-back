const { BadRequest } = require("http-errors");
const { User } = require("../../model");
const { smsService } = require("../sms.service/sms.service");
const { generatePhoneCode } = require("../../helpers");

const verifyPhone = async (_id, phone, code) => {
  try {
    const { phoneVerified } = await User.findById(_id);

    if (phoneVerified) {
      return new BadRequest("Phone number already verified");
    }

    if (code === undefined) {
      const verificationCode = generatePhoneCode();

      await User.findByIdAndUpdate(_id, {
        verificationCode,
      });

      return await smsService.sendCodeInMessage(phone, verificationCode);
    }

    const { verificationCode } = await User.findById(_id);

    if (verificationCode.toString() !== code.toString()) {
      return new BadRequest("Wrong verification code");
    }

    const user = await User.findByIdAndUpdate(
      _id,
      {
        phoneVerified: true,
        verificationCode: null,
      },
      { new: true }
    );

    return user;
  } catch (error) {
    return error;
  }
};

module.exports = { verifyPhone };
