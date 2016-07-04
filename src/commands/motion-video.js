"use strict";

/**
 * Called when new motion video is written
 */

const path = require('path');
const conf = require(path.join(__dirname, "../config"));
const motion = require(path.join(__dirname, "../libs/motion"));
const mVideo = require(path.join(__dirname, "../models/motion_video"));

var imgCallback = function (file) {
    var video = new mVideo({path: file, file: path.basename(file)});
    video.save(function (err) {
        console.log(err);
    });
};

motion.imgWatch(imgCallback);

