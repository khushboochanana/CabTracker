'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String, //UserName
    email: { type: String, lowercase: true }, //UserEmail
    provider: String, //google
    googleId: String,
    pushToken: String,
    location: Object,
    cabId: String,
    image: String,
    phoneNumber: String
});

var User = mongoose.model('User', UserSchema);
exports.default = User;