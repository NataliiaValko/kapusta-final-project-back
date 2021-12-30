const express = require('express');
const router = express.Router();
const passport = require('passport');

const { googleController } = require('../controllers');

const { isLoggedIn } = require('../helpers');
require('../config/passport-setup');

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/api/auth/google/success',
    failureRedirect: '/api/auth/google/failure',
  })
);
router.get('/success', isLoggedIn, googleController.auth);

router.get('/failure', (req, res) => {
  res.send('Failure');
});

module.exports = router;
