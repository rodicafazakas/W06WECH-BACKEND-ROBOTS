const chalk = require('chalk');
const debug = require('debug')('robots:server');
const express = require('express');
const morgan = require('morgan');
const { notFoundErrorHandler, generalErrorHandler } = require('./error');
const robotsRoutes = require('./routes/robotsRoutes');

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Listening to the port ${port}`));
  });

  server.on('error', (error) => {
    debug(chalk.red('Error when starting the server.'));
    if (error.code === 'EADDRINUSE') {
      debug(chalk.red(`The port ${port} is ocupied.`));
    }
  });
};
app.use(morgan('dev'));
app.use(express.json());

app.use('/robots', robotsRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = initializeServer;