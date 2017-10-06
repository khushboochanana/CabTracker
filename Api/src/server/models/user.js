'use strict';
const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String, //UserName
    email: {type: String, lowercase: true}, //UserEmail
    provider: String, //google
    salt: String,
    googleId: String,
});

const User = mongoose.model('User', UserSchema);
module.exports =  User;