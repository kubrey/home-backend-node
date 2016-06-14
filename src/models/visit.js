"use strict";

const path = require('path');
const mongoose = require(path.join(__dirname, "../libs/mongoose"));

require(path.join(__dirname, "../helpers"));


var d = new Date();
console.log(d.ymd('-'));

var Schema = mongoose.Schema({
    ip: String,
    country: String,
    city: String,
    ua: String,
    sid: String,
    day: {type: Date, default: d.ymd('-')},
    counter: {type: Number, default: 1}
});

var Visit = mongoose.model('Visit', Schema);

module.exports = Visit;