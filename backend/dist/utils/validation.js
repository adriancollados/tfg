"use strict";

var _require = require("express-validator"),
  validationResult = _require.validationResult,
  checkSchema = _require.checkSchema;
var validationResponse = function validationResponse(req, res, next) {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors', req.originalUrl, req.body, errors.array());
    return res.status(400).json({
      errorMessage: "INVALID_INPUT_FIELDS",
      fieldsErrors: errors.array(),
      receivedBody: req._originalBody
    });
  }
  return next();
};
module.exports = {
  validationResponse: validationResponse
};