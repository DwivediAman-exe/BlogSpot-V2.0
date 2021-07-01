const { check } = require('express-validator');

exports.contactFormValidator = [
  check('name', 'Name is Required').trim().isLength({ min: 1 }),
  check('email', 'Must be valid Email Address').isEmail(),
  check('message', 'Must be atleast 20 characters long')
    .trim()
    .isLength({ min: 20 }),
];
