"use strict";

var mongoose = require('mongoose');
var path = process.env.MONGODB_PORT ? process.env.MONGODB_PORT : "tcp://localhost:27017";
var mongodbConnectPath = path.replace('tcp', 'mongodb');

mongoose.connect(mongodbConnectPath + "/home", function (err, db) {
    if (err) {
        console.log('MONGO ERROR: ' + err);
    }
});


module.exports = mongoose;