"use strict";

const express = require("express");
const path = require('path');
const geo = require(path.join(__dirname, "libs/geo"));
var conf = require(path.join(__dirname, "config"));
const session = require('express-session');
const helper = require(path.join(__dirname, "helpers"));
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');

const motion = require(path.join(__dirname,"libs/motion"));

motion.imgWatch();

var app = express();

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'jade');

var server = conf.get('server:secure') === true ?
    https.createServer({
        key: fs.readFileSync(conf.get('server:certKey').toString()),
        cert: fs.readFileSync(conf.get('server:certificate').toString()),
        ca: fs.readFileSync(conf.get('server:ca').toString())
    }, app)
    :
    http.createServer(app);

server.listen(conf.get('server:port'));

var sessionConf = conf.get("session");
sessionConf.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;//30 days

app.use(session(sessionConf));

app.use( require(path.join(__dirname, "/routes")));
