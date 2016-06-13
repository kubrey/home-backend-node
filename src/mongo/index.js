"use strict";
var mongoose = require('mongoose');
var mongoConnectPath = process.env.MONGODB_PORT.replace('tcp','mongodb');

console.log(mongoConnectPath);
mongoose.connect(mongoConnectPath+"/home");

module.exports = mongoose;

