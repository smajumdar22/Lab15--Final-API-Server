'use strict';

const Users = require('../models/users.js');

module.exports = (req, res, next) => {

    try {

        let token = req.headers.authorization.split(' ').pop();

        Users.authenticateWithToken(token)
            .then(user => {
                req.user = user;
                next();
            })
            .catch(err => next('Invalid Login'))
    } catch (error) {
      next('Invalid Login');
    }
}