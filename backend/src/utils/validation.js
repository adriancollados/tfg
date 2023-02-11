const { validationResult, checkSchema } = require("express-validator");

const validationResponse = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log('Validation errors', req.originalUrl, req.body, errors.array());
    return res.status(400).json({
      errorMessage: "INVALID_INPUT_FIELDS",
      fieldsErrors: errors.array(),
      receivedBody: req._originalBody,
    });
  }

  return next();
}


module.exports = { validationResponse };