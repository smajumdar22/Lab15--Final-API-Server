'use strict';

require('dotenv').config()
const mongoose = require('mongoose');

const server = require('./api-server/lib/server.js');

// const mongooseOptions = {
//     useNewUrlParser:true,
//     useCreateIndex: true,
//     useuseUnifiedTopology: true
//   };

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser:true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

server.start(process.env.PORT || 3000);
