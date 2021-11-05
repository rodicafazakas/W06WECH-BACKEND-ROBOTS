require('dotenv').config();
require('./database/index');

const initializeServer = require('./server/index');

const port = 5000;

initializeServer(port);
