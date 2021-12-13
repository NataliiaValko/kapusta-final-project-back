const isMailSent = (mailResponse) => {
  return mailResponse?.accepted?.length ? true : false;
};

module.exports = { isMailSent };
