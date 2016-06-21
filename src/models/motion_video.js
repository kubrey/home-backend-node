"use strict";

const path = require('path');
const mongoose = require(path.join(__dirname, "../libs/mongoose"));

require(path.join(__dirname, "../helpers"));

var Schema = mongoose.Schema({
    ip: String,
    country: String,
    city: String,
    ua: String,
    sid: String,
    day: {type: Date, default: Date.now},
    counter: {type: Number, default: 1}
});

var MotionVideo = mongoose.model('motion_video', Schema);

module.exports = Visit;
