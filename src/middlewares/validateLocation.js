const { body } = require('express-validator')

const validateLocations = [
  body('addressLine').notEmpty().withMessage('Address Line is required'),
  body('postalCode').notEmpty().withMessage('Postal Code is required'),
  body('number').notEmpty().withMessage('Number is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('country').notEmpty().withMessage('Country is required'),
];

module.exports = validateLocations;