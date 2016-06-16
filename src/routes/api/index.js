"use strict";

const express = require('express'),
    router = express.Router(),
    path = require('path'),
    config = require(path.join(__dirname, "../config"));
var HttpError = require(path.join(__dirname, '../errors')).HttpError;

var actualVersion = 'v1';


router.get('/', function (req, res) {
    res.send('sddsfdsf');
});

router.post('/', function (req, res) {
    res.send('POST');
});

module.exports = router;