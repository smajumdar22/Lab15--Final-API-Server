'use strict';

const mongoose =  require('mongoose');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

//The schema definition for a user record

let SECRET = 'Ilovecoding';

const Users = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, required: true, default: 'guest', enum: ['admin','editor','producer','guest']}
  });

  const acl = {
    guest: ['read'],
    producer: ['read', 'create'],
    editor: ['read', 'update'],
    admin: ['read', 'delete']
  };
  
  
   //Pre middleware which converts a string password into a hashed password
  Users.pre('save', async function() {
    //this is the user instance
    this.password = await bcrypt.hash(this.password, 5);
  });
  
  Users.methods.can = function (task) {
    // return boolean
    //this.role ... "admin"
    return acl[this.role].includes(task);
  }

// Anything.methods.whatever === instance method
Users.methods.generateToken = function() {
    let tokenObject = {
        username: this.username,
        permissions: acl[this.role]
    };
    return jwt.sign(tokenObject,SECRET);
}


//Anything.statics.whatever === static or classs method
Users.statics.authenticateBasic = async function (username, password){
  let query = {username : username};
  let user = await this.findOne(query);
     if(user) {
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {return user;}
        else {throw 'Invalid User'};
     }
     else{
       throw "Invalid User";
     }
};

Users.statics.authenticateWithToken = async function(token){
  //returns a user
  try {
    let tokenObject =  jwt.verify(token, SECRET);
    console.log(tokenObject);
    let user = await this.findOne({ username: tokenObject.username })
    return user;
  } catch (e) {
    throw e.message;
  }
}
module.exports = mongoose.model('users',Users);