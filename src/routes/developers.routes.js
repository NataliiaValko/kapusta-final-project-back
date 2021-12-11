const express = require('express');
const { developerController } = require('../controllers');
const { asyncWrapper } = require('../helpers');
const router = express.Router();

router.get('/', asyncWrapper(developerController.getAll));

module.exports = router;
