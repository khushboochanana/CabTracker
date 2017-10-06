'use strict';

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
    image: {
        title: String,
        publicId: String
    },
    phoneNumber: String
});

var User = mongoose.model('User', UserSchema);
module.exports = User;