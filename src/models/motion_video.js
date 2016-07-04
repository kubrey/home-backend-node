"use strict";

const path = require('path');
const mongoose = require(path.join(__dirname, "../libs/mongoose"));

require(path.join(__dirname, "../helpers"));
var d = new Date();

var Schema = mongoose.Schema({
    name: String,
    path: String,
    day: {type: Date, default: d.ymd('-')},
    date: {type: Date, default: Date.now}
});

var MotionVideo = mongoose.model('motion_video', Schema);

module.exports = Visit;
