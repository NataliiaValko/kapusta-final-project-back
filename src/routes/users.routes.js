const express = require('express');
const { asyncWrapper } = require('../helpers');
const { userController } = require('../controllers');
const {
  userValidation,
  checkUserCredentials,
  authenticateUser,
  userInvitationValidation,
  userUpdateValidation,
} = require('../middlewares');

const userRouter = express.Router();

userRouter.post('/registration', asyncWrapper(userValidation, userController.registration));
userRouter.get('/verify/:verificationToken', asyncWrapper(userController.verify));
userRouter.post('/login', asyncWrapper(userValidation, checkUserCredentials, userController.login));
userRouter.post('/logout', asyncWrapper(authenticateUser, userController.logout));
userRouter.post('/invite', asyncWrapper(authenticateUser, userInvitationValidation, userController.invite));
userRouter.post('/refresh', asyncWrapper(userController.refresh));
userRouter.get('/current', asyncWrapper(authenticateUser, userController.current));
userRouter.patch('/', asyncWrapper(authenticateUser, userUpdateValidation, userController.update));

module.exports = { userRouter };
