"use strict";

var mongoose = require('mongoose');
var path = process.env.MONGODB_PORT ? process.env.MONGODB_PORT : "tcp://localhost:27017";
var mongodbConnectPath = path.replace('tcp', 'mongodb');

mongoose.connect(mongodbConnectPath + "/home");

module.exports = mongoose;