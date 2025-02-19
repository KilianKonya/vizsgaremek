const express = require('express');
const router = express.Router();
const userController = require('../controllers/loginController');
/*
// Regisztrációs űrlap
router.get('/register', (req, res) => {
  res.render('form');
});

// Regisztráció feldolgozása
router.post('/register', userController.registerUser);
*/
// Belépési űrlap
router.get('/login', (req, res) => {
  res.render('login'); // Külön EJS fájl a belépéshez
});
/*
// Belépési adatok feldolgozása
router.post('/login', userController.loginUser);
*/

router.post('/login',userController.getUserInfo);

router.get('/logout', (req, res) => {
  req.session.destroy();
  const user= null;
  res.redirect('/');
});

module.exports = router;