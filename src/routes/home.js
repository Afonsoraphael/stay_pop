const express = require('express');
const HomeController = require('../controllers/HomeController');
const router = express.Router();

router.get('/', HomeController.showHomePage);
router.get('/login', HomeController.showLogin);
router.post('/login', HomeController.processLogin);

module.exports = router;
