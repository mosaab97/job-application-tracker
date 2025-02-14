const { validationResult } = require('express-validator');

const validateRequest = async (req, res, next) => {
  const results = validationResult(req);
  if (results.isEmpty()) {
    return next();
  }
  const errors = results.array();
  return res.status(400).json({
    status: 'Error',
    message: 'Invalid request',
    data: errors,
    reqUUID: req.headers.reqUUID,
  });
};

module.exports = { validateRequest };