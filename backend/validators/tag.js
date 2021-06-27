const { check } = require('express-validator');

exports.tagCreateValidator = [
  check('name', 'Enter a valid Tag').not().trim().isEmpty(),
];
