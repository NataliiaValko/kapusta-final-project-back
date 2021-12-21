const { TWILIO_ACCOUNT_CID, TWILIO_AUTH_TOKEN, TWILIO_MESSAGING_SID } = require('../../config');
const client = require('twilio');

class SmsService {
  constructor() {
    this.client = client(TWILIO_ACCOUNT_CID, TWILIO_AUTH_TOKEN);
  }

  async sendCodeInMessage(phone, code) {
    const message = await this.client.messages.create({
      body: `Kapu$ta App: your verification code ${code}`,
      messagingServiceSid: TWILIO_MESSAGING_SID,
      to: phone,
    });
    const sid = await message.sid;
    return sid;

    //   .then((message) => {
    //     return message.sid;
    //   })
    //   .done();
    console.log('sent', code);
    return { message: 'sent' };
  }
}

const smsService = new SmsService();

module.exports = { smsService };
