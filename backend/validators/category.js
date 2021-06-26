const { check } = require('express-validator');

exports.categoryCreateValidator = [
  check('name', 'Enter a valid Name').not().trim().isEmpty(),
];
