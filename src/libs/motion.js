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

var motion = function () {
    this.videoDir = motionVideoDir;
    this.imageDir = motionImgDir;
    this.allowedImgExtensions = ['.jpg', '.jpeg','.log'];
    this.allowedVideoExtensions = ['.avi', '.flw', '.mp4'];
};

motion.prototype.getLastImage = function () {

};

motion.prototype.imgWatch = function () {
    var self = this;
    fs.watch(motionImgDir, {}, (event, file) => {
        let filePath = path.join(motionImgDir, file);

        console.log(path.extname(filePath));

        if (self.allowedImgExtensions.indexOf(path.extname(filePath)) !== -1) {
            fs.writeFile(path.join(__dirname, "../../mon1.log"), filePath);
        }
    });
};

motion.prototype.videoWatch = function () {

};

var M = new motion();


module.exports = M;

