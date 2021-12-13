const { mailService } = require("../mail.service/mail.service");
const { User } = require("../../model");
const { isMailSent } = require("../../helpers");

const invite = async ({ user, friendName, friendEmail }) => {
  try {
    const {
      fullName: { firstName, lastName },
      email,
      _id,
    } = user;
    const mailResponse = await mailService.sendInvitationMail(
      `${firstName ?? "Your"} ${lastName ?? "friend"} (${email})`,
      friendName,
      friendEmail
    );

    if (isMailSent(mailResponse)) {
      const currentUser = await User.findById(_id);
      currentUser.invitedFriends.push(friendEmail);
      await currentUser.save();
    }

    return mailResponse;
  } catch (error) {
    return error;
  }
};

module.exports = { invite };
