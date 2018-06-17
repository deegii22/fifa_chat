var express = require('express');
var jwt = require('express-jwt');

var router = express.Router();
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var authController = require('../controllers/authentication');
var profileController = require('../controllers/profile');

// authentication
router.post('/register', authController.register);
router.post('/login', authController.login);

// profile
router.get('/profile', auth, profileController.profileRead);

module.exports = router;
