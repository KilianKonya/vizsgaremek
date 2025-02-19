const express = require('express');
const athaladasController = require('../controllers/athaladasController');
const router = express.Router();

router.get('/athalado', athaladasController.getAllAthaladas);
router.post('/athalado', athaladasController.createAthaladas);
router.delete('/athalado/:id', athaladasController.deleteAthaladas);
router.put('/athalado/:id', athaladasController.updateAthaladas);

module.exports = router;
