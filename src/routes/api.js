"use strict";

const path = require('path');
const config = require(path.join(__dirname, "../config"));
//var log = require(path.join(__dirname, '../libs/logger'))(module);
var HttpError = require(path.join(__dirname, '../errors')).HttpError;

var actualVersion = 'v1';

/**
 * API Gateeway
 * loading routes according to actualVersion
 * @param app
 */
function router(app) {
    app.use(function (req, res, next) {
        //установка заголовка для кросдоменных запросов
        res.header("Access-Control-Allow-Origin", "*");//or * or localhost|*polsky.loc|*polsky.tv|etc
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Mx-ReqToken,X-Requested-With");
        next();
    });
    app.get('/api/', function (req, res) {
        //список версий
        var versions = {version1: '/api/v1/'};
        res.json(versions);
    });

    require(path.join(__dirname, '/' + actualVersion))(app);

}

module.exports = router;
