"use strict";

const express = require('express'),
    router = express.Router(),
    path = require('path'),
    config = require(path.join(__dirname, "../../../../config"));
var HttpError = require(path.join(__dirname, '../../../../errors')).HttpError;
var model = require(path.join(__dirname, "../../../../models/visit"));


router.get('/', function (req, res) {

    var query = model.find({});
    query.where({})
        .limit(10)
        .sort({"day": -1})
        .exec(function (err, result) {
            res.send(require('util').inspect(result));
        });

});

router.post('/', function (req, res) {
    res.send('POST1');
});

module.exports = router;
