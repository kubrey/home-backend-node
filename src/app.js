"use strict";

const express = require("express");
const mongoose = require('mongoose');

var app = express();

var model = require('./mongo/test');

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
    console.log('addr: '+add);
});


model.find({test: 1}, function (err, status) {
    console.log(err, status);
});


app.get('/', function (req, res) {
    res.send('Hello World---!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});