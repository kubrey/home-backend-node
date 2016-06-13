"use strict";
var mongoose = require('mongoose');
var mongoConnectPath = process.env.MONGODB_PORT.replace('tcp','mongodb');

mongoose.connect(mongoConnectPath+"/home");

module.exports = mongoose;

