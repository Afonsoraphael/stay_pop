const { body } = require('express-validator')

const validateLogin = [
  body('email')
    .notEmpty().withMessage('E-mail is required')
    .isEmail().withMessage('Email incorrect format'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

module.exports = validateLogin;