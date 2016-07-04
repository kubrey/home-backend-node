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
    var name = path.basename(file, path.extname(file));
    console.log(name);
    var baseName = motion.matchImgWithVideo(file);
    let eventId = motion.getEventId(file);
    console.log('base name' + eventId);
    //var query = mVideo.where({name: motion.matchImgWithVideo(file)})  ;
    mVideo.findOneAndUpdate({name: new RegExp("-" + eventId + "\.", 'i'),date:{$gt:{}}}, {
        $set: {
            image: {
                name: name
            }
        }
    }, (err, video)=> {
        if (err) {
            console.log(err);
        } else {
            console.log(video);
        }
    });

};

var videoCallback = function (file) {
    console.log(file);
    var video = new mVideo({path: file, name: path.basename(file)});
    video.save(function (err) {
        console.log(err);
    });
};

motion.imgWatch(imgCallback);

motion.videoWatch(videoCallback);

//var file = '/home/app/homebackend/motion-dev/2016-07-04--08-39-31-505-04.jpg';
//var name = path.basename(file, path.extname(file));
//
//var baseName = motion.matchImgWithVideo(file);
//console.log('base name' + baseName);
////var query = mVideo.where({name: motion.matchImgWithVideo(file)})  ;
//mVideo.findOneAndUpdate({name: new RegExp(baseName, 'i')}, {
//    $set: {
//        image: {
//            name: name,
//            type:'best'
//        }
//    }
//}, (err, video)=> {
//    if (err) {
//        console.error(err);
//    } else {
//        console.log(video);
//    }
//});
