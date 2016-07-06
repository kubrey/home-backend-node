"use strict";

const path = require('path');
const mongoose = require(path.join(__dirname, "../libs/mongoose"));

require(path.join(__dirname, "../helpers"));
var d = new Date();

var Schema = mongoose.Schema({
    name: String,
    path: String,
    eventId: Number,
    image: {
        name: String,
        type: {type: String, default: 'best'}
    },
    external: {
        url: String,
        uploaded: {type: Date}
    },
    day: {type: Date, default: d.ymd('-')},
    date: {type: Date, default: Date.now}
});


var MotionVideo = mongoose.model('motion_video', Schema);


MotionVideo.availableSortings = ['date', '-date'];
MotionVideo.prepareDocument2View = function (doc) {
    return doc;
};

module.exports = MotionVideo;
