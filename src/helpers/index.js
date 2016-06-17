"use strict";

/**
 *
 * @param separator
 * @return {string}
 */
Date.prototype.ymd = function (separator) {
    var sep = separator !== undefined ? separator : "";
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return yyyy + sep + (mm[1] ? mm : "0" + mm[0]) + sep + (dd[1] ? dd : "0" + dd[0]); // padding
};


var fs = require('fs');

var helper = function () {
};

/**
 *
 * @param dir
 * @param files_
 * @return {*|Array}
 */
helper.prototype.getFiles = function (dir, files_) {
    files_ = files_ || [];
    var self = this;
    var files = fs.readdirSync(dir);
    if (!files) {
        return files_;
    }
    for (var i in files) {
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            self.getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
};

/**
 *
 * @param request
 * @return {*}
 */
helper.prototype.getIp = function (request) {
    if (!request.connection) {
        return null;
    }
    var socketIp = null;
    if (request.connection.socket) {
        if (request.connection.socket.remoteAddress) {
            socketIp = request.connection.socket.remoteAddress;
        }
    }
    return (req.headers['x-forwarded-for'] || '').split(',')[0] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        socketIp;
};

/**
 *
 * @param cookie
 * @return {{}}
 */
helper.prototype.getCookies = function (cookie) {
    var list = {},
        rc = cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
};

var Helper = new helper();

module.exports = Helper;


