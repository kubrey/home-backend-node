"use strict";

const express = require("express");
const path = require('path');
const geo = require(path.join(__dirname, "libs/geo"));
var conf = require(path.join(__dirname, "config"));
const session = require('express-session');
require(path.join(__dirname, "helpers"));

var app = express();

var d = new Date();
console.log(d.ymd('-'));

var sessionConf = conf.get("session");
sessionConf.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;//30 days

app.use(session(sessionConf));

var Visit = require(path.join(__dirname, "/models/visit"));

app.get('/', function (req, res) {
    var sessId = req.sessionID ? req.sessionID : null;
    var ip = (req.headers['x-forwarded-for'] || '').split(',')[0]
        || req.connection.remoteAddress;
    var guest = {ip: ip, ua: req.headers['user-agent'], country: null, city: null, sid: sessId};

    geo.lookup(ip, function (err, result) {
        guest.country = (err) ? null : result.countryCode;
        guest.city = (err) ? null : result.city;
        Visit.update({sid: sessId, day: d.ymd('-')},
            {
                $set: guest,
                $inc: {
                    counter: 1
                }
            },
            {upsert: true},
            function (err) {
                if (err) {
                    console.log(err);
                }
            });
        if (err) {
            console.log(err);
            res.status(500).send('Failed to find geo data');
            return;
        }
        res.status(200).send(require('util').inspect(result)).end();
    });
});

app.listen(conf.get('http:port'), function () {
    console.log('Example app listening on port 3000!');
});