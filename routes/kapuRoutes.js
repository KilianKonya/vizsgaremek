const express = require('express');
const kapuController = require('../controllers/kapuController');
const router = express.Router();

router.get('/kapu', kapuController.getAllKapu);
router.get('/kapu_m',kapuController.getAllKapu_m);
router.post('/kapu', kapuController.createKapu);

module.exports = router;
