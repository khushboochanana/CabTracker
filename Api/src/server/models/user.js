'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String, //UserName
    email: {type: String, lowercase: true}, //UserEmail
    provider: String, //google
    googleId: String,
    pushToken: String,
    location: Object,
    cabId: String,
    image: {
        title: String,
        publicId: String,
    },
    phoneNumber: String,
});

const User = mongoose.model('user', UserSchema);
export default User;
