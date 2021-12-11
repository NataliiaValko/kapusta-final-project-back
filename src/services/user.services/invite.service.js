const { mailService } = require('../mail.service');

const invite = async ({ user, friendName, friendEmail }) => {
  try {
    const {
      fullName: { firstName, lastName },
      email,
    } = user;
    const mailResponse = await mailService.sendInvitationMail(
      `${firstName ?? 'Your'} ${lastName ?? 'friend'} (${email})`,
      friendName,
      friendEmail
    );

    return mailResponse;
  } catch (error) {
    return error;
  }
};

module.exports = { invite };
