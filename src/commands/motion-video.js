"use strict";

/**
 * Called when new motion video is written
 *
 * Saving to mongodb + pushing to the clients
 */

const path = require('path');
const conf = require(path.join(__dirname, "../config"));
const motion = require(path.join(__dirname, "../libs/motion"));

require(path.join(__dirname, "../helpers"));
var d = new Date();
/**
 *
 * @type {*|Object}
 */
const mVideo = require(path.join(__dirname, "../models/motion_video"));

/**
 * Find video for new image by file name and update mongodb doc
 * @param {String} file
 */
var imgCallback = function (file) {
    var name = path.basename(file);
    let eventId = motion.getEventId(file);
    if (!eventId) {
        console.log("No event id for file " + file);
        return false;
    }

    require('fs').stat(file, function (err, stats) {
        if(err){
            console.log(err);
            return;
        }
        var dt = new Date(stats.mtime);
        mVideo.findOneAndUpdate({eventId: eventId}, {
            $set: {
                date: dt,
                day: dt.ymd('-'),
                image: {
                    name: name,
                    type: 'best'
                }
            }
        }, {new: true, upsert: true, sort: {date: -1}}, (err, video)=> {
            if (err) {
                console.log(err);
            }
        });
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