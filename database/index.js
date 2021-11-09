const debug = require('debug')('robots:database');

const chalk = require('chalk');
const mongoose = require('mongoose');

const connectDB = (connectionString) => 
  new Promise( (resolve, reject) => {
    mongoose.set("debug", true);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v;
      }
    });
    
    mongoose.connection
    .on("open", () => {
      debug(chalk.green("The database connection is open"));
    })
    .on("close", () => {
      debug(chalk.green("The database is disconnected"));
    });

    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug(chalk.red('Connection refused!'));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.green('Connection success!'));
      resolve();
    });


});

module.exports = connectDB;