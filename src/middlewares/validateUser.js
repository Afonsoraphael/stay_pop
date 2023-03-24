const { body } = require('express-validator')

const validateUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email')
    .notEmpty().withMessage('E-mail is required')
    .isEmail().withMessage('Email incorrect'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({max: 20, min: 8}).withMessage('Password length must be between 8 and 20 characters'),
];

module.exports = validateUser;