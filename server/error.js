const debug = require('debug')('robots:errors');
const { ValidationError } = require("express-validation");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
};


// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  debug('There was an error', error.message);

  if (error instanceof ValidationError) {
    error.code = 400;
    error.message("Evil request");
  }

  const message = error.code ? error.message : 'General failure';
  res.status(error.code || 500).json({ error: message });
};


module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
};
