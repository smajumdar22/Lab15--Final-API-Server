'use strict';


//Third part dependencies
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const apiRoutes = require('./routes/api.js')
const authRoutes = require('../auth/routes.js')

const timestamp = require('./middleware/timestamp.js');
const logger = require('./middleware/logger.js');
const errorHandler = require('./middleware/500.js');
const notFoundHandler = require('./middleware/404.js');

const app = express();



//Third party global middleware
app.use(cors());
app.use(morgan('dev'));


//Our middleware
app.use(express.json());
app.use(timestamp);
app.use(logger);

//Routes
app.use('/api/v1',apiRoutes);
app.use(authRoutes);


// because these are defined last, they end up as catch-alls.
app.use('*', notFoundHandler);
app.use(errorHandler);

// Export an object with the whole server and a separate method that can start the server
module.exports = {
  //exporting app for testing
  apiServer: app,
  start: (port) => {
    app.listen(port, () => console.log(`Listening on ${port}`));
  }
};
