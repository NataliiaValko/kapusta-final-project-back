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
} = require('../middlewares');

const userRouter = express.Router();

userRouter.post('/registration', asyncWrapper(userValidation, userController.registration));
userRouter.get('/verify/:verificationToken', asyncWrapper(userController.verify));
userRouter.post('/login', asyncWrapper(userValidation, checkUserCredentials, userController.login));
userRouter.get('/logout', asyncWrapper(authenticateUser, userController.logout));
userRouter.post('/invite', asyncWrapper(authenticateUser, userInvitationValidation, userController.invite));
userRouter.post('/refresh', asyncWrapper(userController.refresh));
userRouter.get('/current', asyncWrapper(authenticateUser, userController.current));
userRouter.patch('/avatar', asyncWrapper(authenticateUser, checkFilePresence, userController.changeAvatar));
userRouter.patch('/update', asyncWrapper(authenticateUser, userUpdateValidation, userController.update));
// userRouter.get('/phone-verify', asyncWrapper(authenticateUser, userPhoneValidation, userController.verifyPhone));

module.exports = { userRouter };
