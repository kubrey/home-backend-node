"use strict";

/**
 * Called when new motion video is written
 */

const path = require('path');
const conf = require(path.join(__dirname, "../config"));
const motion = require(path.join(__dirname,"../libs/motion"));

motion.imgWatch();

