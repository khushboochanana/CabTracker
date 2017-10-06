'use strict';
const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

var CabSchema = new Schema({
    name: String, //cabName
    driver: {
      name: String,
      phoneNumber: String,
      emailId: String,
    }, // driver details
    cabMates: Array, // cab mates details
    arrivalTime: String, // arrival time of cab
});

const Cab = mongoose.model('Cab', CabSchema);
module.exports =  Cab;