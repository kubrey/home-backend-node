"use strict";

const geo = require('geosearch');

var geoOptions = {
    services: {
        'maxmind-dat': false,
        'maxmind-mmdb': false
    },
    fields: {
        countryCode: true,
        city: true
    }
};

geo.setOptions(geoOptions);

module.exports = geo;
