const debug = require('debug')('robots:errors');

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
};

// eslint-disable-next-line no-unused-vars
const generalErrorHandler = (error, req, res, next) => {
  debug('There was an error', error.message);
  const message = error.code ? error.message : 'General failure';
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
};
