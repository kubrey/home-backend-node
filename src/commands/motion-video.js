"use strict";

/**
 * Called when new motion video is written
 *
 * Saving to mongodb + pushing to the clients
 */

const path = require('path');
const conf = require(path.join(__dirname, "../config"));
const motion = require(path.join(__dirname, "../libs/motion"));
const mVideo = require(path.join(__dirname, "../models/motion_video"));

/**
 * Find video for new image by file name and update mongodb doc
 * @param file
 */
var imgCallback = function (file) {
    var name = path.basename(file);
    let eventId = motion.getEventId(file);
    //var query = mVideo.where({name: motion.matchImgWithVideo(file)})  ;
    mVideo.findOneAndUpdate({eventId: eventId}, {
        $set: {
            image: {
                name: name,
                type: 'best'
            }
        }
    }, {new: true, upsert: false,sort:{date:-1}}, (err, video)=> {
        if (err) {
            console.log(err);
        }
    });

};

var videoCallback = function (file) {
    let eventId = motion.getEventId(file);
    mVideo.findOneAndUpdate({path: file, eventId: eventId}, {
        path: file,
        name: path.basename(file),
        eventId: eventId
    }, {upsert: true, new: true, setDefaultsOnInsert: true}, (err, doc)=> {
        if (err) {
            console.log(err);
        }

    });

};

motion.watch(videoCallback, imgCallback);