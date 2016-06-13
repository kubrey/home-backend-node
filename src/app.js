"use strict";

const express = require("express");
const mongoose = require('mongoose');

var app = express();

var model = require('./mongo/test');


//var MONGO_DB;
//var DOCKER_DB = 3000;
//if ( DOCKER_DB ) {
//    //MONGO_DB = DOCKER_DB.replace( 'tcp', 'mongodb' ) + '/myapp';
//} else {
//    MONGO_DB = process.env.MONGODB;
//}

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: '+add);
});

console.log(process.env);


model.find({test: 1}, function (err, status) {
    console.log(err, status);
});


app.get('/', function (req, res) {
    res.send('Hello World---!' + process.env);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});