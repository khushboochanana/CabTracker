'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String, //UserName
    email: { type: String, lowercase: true }, //UserEmail
    provider: String, //google
    salt: String,
    googleId: String
});

var User = mongoose.model('User', UserSchema);
module.exports = User;