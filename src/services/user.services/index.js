const { registration } = require('./registration.service');
const { login } = require('./login.service');
const { verify } = require('./verify.service');
const { logout } = require('./logout.service');
const { invite } = require('./invite.service');
const { refresh } = require('./refresh.service');
const { current } = require('./current.service');
const { update } = require('./update.service');
const { changeBalance } = require('./changeBalance.service');
const { changeAvatar } = require('./changeAvatar.service');
const { verifyPhone } = require('./verifyPhone.service');

module.exports = {
  registration,
  login,
  verify,
  logout,
  invite,
  refresh,
  current,
  update,
  changeBalance,
  changeAvatar,
  verifyPhone,
};
