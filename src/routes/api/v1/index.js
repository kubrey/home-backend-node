"use strict";

const express = require('express'),
    router = express.Router(),
    path = require('path'),
    config = require(path.join(__dirname, "../../../config"));
var HttpError = require(path.join(__dirname, '../../../errors')).HttpError;


router.get('/', function (req, res) {
    res.send('sddsfdsf123');
});

router.post('/', function (req, res) {
    res.send('POST1');
});

module.exports = router;