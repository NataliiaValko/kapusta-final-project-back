const { registration } = require('./registration.controller');
const { login } = require('./login.controller');
const { verify } = require('./verify.controller');
const { logout } = require('./logout.controller');
const { invite } = require('./invite.controller');
const { refresh } = require('./refresh.controller');
const { current } = require('./current.controller');
const { update } = require('./update.controller');
const { changeAvatar } = require('./changeAvatar.controller');
const { verifyPhone } = require('./verifyPhone.controller');

module.exports = { registration, verify, login, logout, invite, refresh, current, update, changeAvatar, verifyPhone };
