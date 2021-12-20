const nodemailer = require('nodemailer');
const { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER, FRONTEND_APP_URL, BACKEND_APP_URL } = require('../../config');
const { prepareRegistrationMail } = require('./registration.mail');
const { prepareInvitationMail } = require('./invitation.mail');

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
    console.log('verificationToken', verificationToken);

    return await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: 'Please confirm your registration!',
      text: '',
      html: prepareRegistrationMail(BACKEND_APP_URL, verificationToken),
    });
  }

  async sendInvitationMail(userName, friendName = 'friend', friendEmail) {
    return await this.transporter.sendMail({
      from: SMTP_USER,
      to: friendEmail,
      subject: 'Your friend invites to join Kapu$ta App!',
      text: '',
      html: prepareInvitationMail(friendName, userName, FRONTEND_APP_URL),
    });
  }
}

const mailService = new MailService();

module.exports = { mailService };
