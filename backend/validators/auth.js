const { check } = require('express-validator');

exports.userSignupValidator = [
  check('name', 'Enter a valid Name').not().trim().isEmpty(),
  check('email', 'Enter a valid Email').isEmail(),
  check('password', 'Enter a valid Password')
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
];

exports.userSigninValidator = [
  check('email', 'Email or Password is incorrect').isEmail(),
  check('password', 'Email or Password is incorrect')
    .not()
    .isEmpty()
    .isLength({ min: 6 }),
];
