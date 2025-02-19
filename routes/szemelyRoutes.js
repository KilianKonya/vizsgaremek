const express = require('express');
const szemelyController = require('../controllers/szemelyController');
const router = express.Router();

router.get('/szemelyek',  szemelyController.getAllSzemely);
router.post('/szemelyek', szemelyController.createSzemely);

module.exports = router;
