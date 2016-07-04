"use strict";

const path = require('path');
const conf = require(path.join(__dirname, "../config"));
const fs = require('fs');

const pathTypeRel = 'relative';
const pathTypeAbs = 'absolute';

var motionImgDir = conf.get('motion:images:pathType') == pathTypeRel
    ? path.join(conf.get('project:root'), conf.get('motion:images:dir'))
    : conf.get('motion:images:dir');

var motionVideoDir = conf.get('motion:videos:pathType') == pathTypeRel
    ? path.join(conf.get('project:root'), conf.get('motion:videos:dir'))
    : conf.get('motion:videos:dir');

console.log(motionVideoDir,motionImgDir);

var motion = function () {
    this.videoDir = motionVideoDir;
    this.imageDir = motionImgDir;
    this.allowedImgExtensions = ['.jpg', '.jpeg', '.log'];
    this.allowedVideoExtensions = ['.avi', '.flw', '.mp4'];
};

motion.prototype.getLastImage = function () {

};

/**
 *
 * @param imgFile
 * @return {string}
 */
motion.prototype.matchImgWithVideo = function (imgFile) {
    let name = path.basename(imgFile, path.extname(imgFile));
    let parts = name.split('-');
    parts.pop();

    return parts.join('-');

};

/**
 *
 * @param file
 * @return {String}
 */
motion.prototype.getEventId = function(file){
    let name = path.basename(file, path.extname(file));
    let parts = name.split('-');

    parts.pop();
    return parts.pop();
};

/**
 * File format for video and images is configured in motion.conf
 * I have YYYY-mm-dd--HH-ii-ss-$id for video
 * and YYYY-mm-dd--HH-ii-ss-$id-$pictureId for images
 * So image and video paths matches except the last part of image path
 * N.B.! If video was created on 14:55:55 and lasts for more than 5 sec -> image will be created at 14:56:... minutes will not match!
 * Image is set to be the "best picture" so it's written after video when event is over
 */

/**
 *
 * @param {Function} callback accept file path
 */
motion.prototype.imgWatch = function (callback) {
    var self = this;
    fs.watch(motionImgDir, {}, (event, file) => {
        let filePath = path.join(motionImgDir, file);

        console.log(path.extname(filePath));

        if (self.allowedImgExtensions.indexOf(path.extname(filePath)) !== -1) {
            fs.writeFile(path.join(__dirname, "../../mon1.log"), filePath);
            callback(filePath);
        }
    });
};

/**
 *
 * @param {Function} callback принимает путь к файлу
 */
motion.prototype.videoWatch = function (callback) {
    var self = this;
    fs.watch(motionVideoDir, {}, (event, file) => {
        let filePath = path.join(motionVideoDir, file);

        console.log(path.extname(filePath));
        if (self.allowedVideoExtensions.indexOf(path.extname(filePath)) !== -1) {
            fs.writeFile(path.join(__dirname, "../../mon1.log"), filePath);
            callback(filePath);
        }
    });
};

var M = new motion();


module.exports = M;

