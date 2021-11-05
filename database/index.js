const debug = require('debug')('robots:database');

const chalk = require('chalk');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_STRING, (error) => {
  if (error) {
    debug(chalk.red('Connection refused!'));
    debug(chalk.red(error.message));
    return;
  }
  debug(chalk.green('Connection success!'));
});
