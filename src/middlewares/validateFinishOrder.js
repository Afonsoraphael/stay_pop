const { body } = require('express-validator')

const validateFinishOrder = [
  body('locationId').notEmpty().withMessage('Is necessary a location to finish order'),
];

module.exports = validateFinishOrder;