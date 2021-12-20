const { TWILIO_ACCOUNT_CID, TWILIO_AUTH_TOKEN, TWILIO_MESSAGING_SID } = require('../../config');
const client = require('twilio');

class SMSService {
  constructor() {
    this.client = client(TWILIO_ACCOUNT_CID, TWILIO_AUTH_TOKEN);
  }

  async sendCodeInMessage(phone, code) {
    return this.client.messages
      .create({
        body: `Kapu$ta App: your verification code ${code}`,
        messagingServiceSid: TWILIO_MESSAGING_SID,
        to: phone,
      })
      .then((message) => console.log(message.sid))
      .done();
  }
}

const smsService = new SMSService();

module.exports = { smsService };
