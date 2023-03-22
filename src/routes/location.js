const express = require('express');
const LocationController = require('../controllers/LocationController');
const router = express.Router();
const validateLocations = require('../middlewares/validateLocation')

router.post('/locations', validateLocations, LocationController.Create)

module.exports = router