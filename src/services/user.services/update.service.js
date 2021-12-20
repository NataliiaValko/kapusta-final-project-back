const { BadRequest } = require("http-errors");
const { User } = require("../../model");
const { checkFieldsOnUserUpdate } = require("../../helpers");

const update = async (body) => {
  try {
    const {
      user: { _id, isBalanceSetted },
      ...updateUserData
    } = body;

    if (isBalanceSetted && "balance" in updateUserData) {
      return new BadRequest("Balance is already setted");
    } else if (!isBalanceSetted && "balance" in updateUserData) {
      updateUserData.isBalanceSetted = true;
    }

    const user = await User.findById(_id);
    const { fullName, settings } = user;

    Object.keys(updateUserData).forEach((key) => {
      if (checkFieldsOnUserUpdate(updateUserData, key))
        user[key] = updateUserData[key];
    });

    user.settings = { ...settings, ...updateUserData?.settings };
    user.fullName = { ...fullName, ...updateUserData?.fullName };

    await user.save();

    return user;
  } catch (error) {
    return error;
  }
};

module.exports = { update };
