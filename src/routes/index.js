"use strict";

const express = require('express'),
    path = require('path'),
    router = express.Router(),
    helper = require(path.join(__dirname, "../helpers"));

router.get('/', function (req, res) {
    res.send('sddsfdsf');
});

router.post('/', function (req, res) {
    res.send('POST');
});

router.use(function (req, res, next) {
    //установка заголовка для кросдоменных запросов
    res.header("Access-Control-Allow-Origin", "*");//or * or localhost|*polsky.loc|*polsky.tv|etc
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Mx-ReqToken,X-Requested-With");
    next();
});

//Получаем список файлов в директории routes
var routes = helper.getFiles(__dirname, []);

//
//и подключаем их всех
for (var routeFileInd in routes) {
    if (!routes.hasOwnProperty(routeFileInd)) {
        continue;
    }
    if (routes[routeFileInd] == __filename) {
        continue;
    }
    if (path.extname(routes[routeFileInd]) === '.js') {
        var routeName = routes[routeFileInd].replace(__dirname, '');
        //console.log(path.basename(routes[routeFileInd], path.extname(routes[routeFileInd])));
        //if (path.basename(path.dirname(routes[routeFileInd])) === 'v1' || path.basename(path.dirname(routes[routeFileInd])) === 'v2') {
        //    continue;//пропускам саб-контроллеры api
        //}
        router.use(path.dirname(routeName), require(routes[routeFileInd]));//eg /api/v1 -> api/v1/index.js

    }
}

module.exports = router;