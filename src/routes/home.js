const express = require('express');
const HomeController = require('../controllers/HomeController');
const validateLogin = require('../middlewares/validateLogin');
const router = express.Router();

router.get('/', HomeController.showHomePage);
router.get('/login', validateLogin, HomeController.showLogin);
router.post('/login', HomeController.processLogin);

module.exports = router;
