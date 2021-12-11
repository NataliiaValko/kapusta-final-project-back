const express = require('express');
const { asyncWrapper } = require('../helpers');
const { transactionController } = require('../controllers');
const { authenticateUser, transactionValidation } = require('../middlewares');

const transactionRouter = express.Router();

transactionRouter.post(
  '/',
  asyncWrapper(
    authenticateUser,
    transactionValidation,
    transactionController.add
  )
);
transactionRouter.get(
  '/',
  asyncWrapper(authenticateUser, transactionController.getAll)
);
transactionRouter.delete(
  '/:transactionId',
  asyncWrapper(authenticateUser, transactionController.remove)
);

// transactionRouter.get(
//     "/get",
//     asyncWrapper(authenticateUser, userValidation, transactionController.add)
//   );
// router.get("/get", asyncWrapper(transactionController.getAll));

module.exports = { transactionRouter };
