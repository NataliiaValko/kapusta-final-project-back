const express = require('express');
const { asyncWrapper } = require('../helpers');
const { userController } = require('../controllers');
const {
  userValidation,
  checkUserCredentials,
  authenticateUser,
  userInvitationValidation,
  userUpdateValidation,
  checkFilePresence,
  userPhoneVerificationValidation,
  userPasswordsValidation,
  checkUserPasswords,
} = require('../middlewares');

const userRouter = express.Router();

userRouter.post('/registration', asyncWrapper(userValidation, userController.registration));
userRouter.get('/verify/:verificationToken', asyncWrapper(userController.verify));
userRouter.post('/login', asyncWrapper(userValidation, checkUserCredentials, userController.login));
userRouter.post('/logout', asyncWrapper(authenticateUser, userController.logout));
userRouter.post('/invite', asyncWrapper(authenticateUser, userInvitationValidation, userController.invite));
userRouter.post('/refresh', asyncWrapper(userController.refresh));
userRouter.get('/current', asyncWrapper(authenticateUser, userController.current));
userRouter.patch('/avatar', asyncWrapper(authenticateUser, checkFilePresence, userController.changeAvatar));
userRouter.patch('/update', asyncWrapper(authenticateUser, userUpdateValidation, userController.update));
userRouter.patch(
  '/phone-verify',
  asyncWrapper(authenticateUser, userPhoneVerificationValidation, userController.verifyPhone)
);
userRouter.patch(
  '/password',
  asyncWrapper(authenticateUser, checkUserPasswords, userPasswordsValidation, userController.changePassword)
);

module.exports = { userRouter };
