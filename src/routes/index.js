"use strict";

const express = require('express')
    , router = express.Router(),
    helper = require('')

router.get('/', function (req, res) {
    res.send('sddsfdsf');
});

router.post('/', function (req, res) {
    res.send('POST');
});

//Получаем список файлов в директории routes
var routes = helper.getFiles(__dirname + '/routes');

//и подключаем их всех
for (var routeFileInd in routes) {
    if (!routes.hasOwnProperty(routeFileInd)) {
        continue;
    }
    if (path.extname(routes[routeFileInd]) === '.js') {
        if (path.basename(path.dirname(routes[routeFileInd])) === 'v1' || path.basename(path.dirname(routes[routeFileInd])) === 'v2') {
            continue;//пропускам саб-контроллеры api
        }
        router()
        //require(routes[routeFileInd])(app);
        //app.use("/"+path.basename(routes[routeFileInd], path.extname(routes[routeFileInd])),require(routes[routeFileInd]));
    }
}

module.exports = router;