"use strict";

var mongoose = require('mongoose');
var path = process.env.MONGODB_PORT ? process.env.MONGODB_PORT : "tcp://mongodb:37017";
var mongodbConnectPath = path.replace('tcp', 'mongodb');

mongoose.connect(mongodbConnectPath + "/home", function (err, db) {
    if (err) {
        console.log('MONGO ERROR: ' + err);
    }
});

mongoose.set('debug', function (coll, method, query, doc) {
    //console.log(query);
    //require('fs').writeFile(require('path').join(__dirname, "../queries.log"), require('util').inspect(query),{},{});
});

module.exports = mongoose;