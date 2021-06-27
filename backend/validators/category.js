const { check } = require('express-validator');

exports.categoryCreateValidator = [
  check('name', 'Enter a valid Category').not().trim().isEmpty(),
];
