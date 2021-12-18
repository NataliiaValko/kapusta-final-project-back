const registration = require('./registration.swagger');
const { login } = require('./login.swagger');
const { logout } = require('./logout.swagger');
const { current } = require('./current.swagger');
const { update } = require('./update.swagger');
const { invite } = require('./invite.swagger');

module.exports = { ...registration, ...login, ...logout, ...current, ...update, ...invite };
