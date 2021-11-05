require('dotenv').config();
require('./database/index');
const chalk = require('chalk');
const debug = require('debug')('robots:server');

const initializeServer = require('./server/index');

const port = process.env.PORT || 5000;

debug(chalk.yellow(port));
initializeServer(port);
