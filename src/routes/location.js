const express = require('express');
const LocationController = require('../controllers/LocationController');
const router = express.Router();
const validateLocations = require('../middlewares/validateLocation')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/locations', validateLocations, isLoggedIn ,LocationController.Create)

module.exports = router