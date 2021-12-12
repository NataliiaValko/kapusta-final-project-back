const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER, APP_LINK, BACKEND_APP_URL } = require('../config');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, verificationToken) {
    return await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: 'Registration verification',
      text: '',
      html:
        `<h1>Hello, dear guest!</h1>` +
        `<h2>Welcome to our <b>Kapusta Application</b>` +
        `</h2><p>Please complete your registration by clicking ` +
        `<a href='${BACKEND_APP_URL}/api/users/verify/${verificationToken}'` +
        `>THIS LINK</a></p><p>We appreciate for your ` +
        `connection!</p><h3>Have a nice day!</h3>`,
    });
  }

  async sendInvitationMail(userName, friendName = 'friend', friendEmail) {
    return await this.transporter.sendMail({
      from: SMTP_USER,
      to: friendEmail,
      subject: 'Your friend invites to join Kapusta App!',
      text: '',
      html:
        `<h1>Hello, dear ${friendName}!</h1>` +
        `<h2>${userName} invites you to enjoy our App!` +
        `</h2><p>Please feel free while using ` +
        `<a href='${APP_LINK}'` +
        `>Kapusta Application</a></p><p>We appreciate for your ` +
        `connection!</p><h3>Have a nice day!</h3>`,
    });
  }
}

const mailService = new MailService();

module.exports = { mailService };
