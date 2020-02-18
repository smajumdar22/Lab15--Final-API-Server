'use strict';

const express =  require('express');
const router =  express.Router();

const basicAuth = require('./middleware/basic-auth-middleware.js');
const oauth = require('./middleware/oauth-middleware.js');
const Users = require('./models/users.js');


//Our middleware
// app.use(timestamp);
// app.use(logger);

router.post('/signup', async (req,res)=>{

let user = new Users(req.body);

  user.save(req.body)
    .then (user => {
      console.log(user);
      //make a token
      let token = user.generateToken();
      res.status(200).send(token)
    })
     .catch( err => {
       res.status(403).send('You cannot do this');
     })
 
});

router.post('/signin', basicAuth, (req,res) => {
  res.status(200).send(req.token);
});

router.get('/oauth',oauth,(req,res)=>{
    res.status(200).send(req.token);
});


// because these are defined last, they end up as catch-alls.
// app.use('*', notFoundHandler);
// app.use(errorHandler);

// Export an object with the whole server and a separate method that can start the server
module.exports = router;