const { validationResult } = require('express-validator')
const { Location } = require('../models')

const LocationController = {
  Create: async (req, res) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()) {
      return res.status(404).json(errors);
    }

    const locationToCreate = {
      addressLine, 
      postalCode, 
      number,
      state,
      country
    } = req.body;

    try {
      const locationCreated = await Location.create(locationToCreate);
      return res.status(201).json(locationCreated);
    } catch (error) {
      return res.status(500).json({error: error.message});
    }
  }
}

module.exports = LocationController