"use strict";

const path = require('path');
const nconf = require('nconf');

var env = process.argv[2] ? process.argv[2] : 'development';

var confFile = env === 'production' ? 'config-prod.json' : 'config-dev.json';

var fileObj = {file: path.join(__dirname, confFile)};

nconf.use('file', fileObj);

module.exports = nconf;