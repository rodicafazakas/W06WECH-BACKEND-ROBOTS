require('dotenv').config();
require('./database/index');
const chalk = require('chalk');
const debug = require('debug')('robots:server');
const connectDB = require("./database/index");

const {initializeServer} = require('./server/index');

const port = process.env.PORT || 5000;

debug(chalk.yellow(port));
(async () => {
  try {
    await connectDB(process.env.MONGODB_STRING);
    await initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();



