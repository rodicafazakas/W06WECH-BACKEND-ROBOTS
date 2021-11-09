const chalk = require('chalk');
const debug = require('debug')('robots:server');
const express = require('express');

const cors = require('cors');
const morgan = require('morgan');
const { notFoundErrorHandler, generalErrorHandler } = require('./error');
const robotsRoutes = require('./routes/robotsRoutes');
const usersRoutes = require('./routes/userRoutes');
const auth = require("./auth");

const app = express();

const initializeServer = (port) => 
  new Promise( (resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Listening to the port ${port}`));
      resolve(server);
    });

    server.on('error', (error) => {
      debug(chalk.red('Error when starting the server.'));
      if (error.code === 'EADDRINUSE') {
        debug(chalk.red(`The port ${port} is ocupied.`));
      }
      reject();
    });

    server.on("close", () => {
		  debug(chalk.yellow("Server express disconected"));
	  })
  });

// configurar el servidor
app.use(morgan('dev'));
app.use(cors())
app.use(express.json());
app.use('/users', usersRoutes);
app.use('/robots', auth, robotsRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);



module.exports = { app, initializeServer };
