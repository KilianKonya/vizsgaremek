const express = require('express');
const fooldalController = require('../controllers/fooldalController');
const router = express.Router();

router.get('/', fooldalController.getAllAthaladas);


module.exports = router;
