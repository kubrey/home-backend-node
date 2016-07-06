"use strict";

const express = require('express'),
    router = express.Router(),
    path = require('path'),
    config = require(path.join(__dirname, "../../../../../config")),
    moment = require('moment');
var HttpError = require(path.join(__dirname, '../../../../../errors')).HttpError;

var motionModel = require(path.join(__dirname, "../../../../../models/motion_video"));
var motionLib = require(path.join(__dirname, "../../../../../libs/motion"));


/**
 * Rules of querying:
 - date intervals:
 from (format ISO)
 to (format ISO)

 - paging params:
 offset

 - sorting
 sort (field|-field - DESC) available: date
 default:-date
 */


/**
 * getting list of last motions
 */
router.get('/', function (req, res) {
    //motionModel.find({})
    let getParams = req.query;

    var q = motionModel.find({});
    var isSortingSet = false;
    if (Object.keys(getParams).length > 0) {
        if (getParams['from'] !== undefined) {
            q.where('date').gte(new Date(moment(getParams['from']).format()));
        }
        if (getParams['to'] !== undefined) {
            q.where('date').lte(new Date(moment(getParams['to']).format()));
        }
        if (getParams['sort'] !== undefined) {

            if (motionModel.availableSortings.indexOf(getParams['sort']) !== -1) {
                var asc = getParams['sort'].charAt(0) == '-' ? -1 : 1;
                var sortField = asc === -1 ? getParams.sort.substring(1) : getParams.sort;
                var sort = {};
                sort[sortField] = asc;
                q.sort(sort);
                isSortingSet = true;
            }

        }
    }
    if (!isSortingSet) {
        q.sort({date: -1});
    }
    q.limit(10).exec((err, docs)=> {
        if (err) {
            res.send("error");
            //return HttpError(err);
        } else {
            res.json(docs);
        }
    });
});

/**
 * getting last motion
 */
router.get('/last', function (req, res) {
    //motionModel.find({})
    res.send(config.get('project:root'));
});

/**
 * get motion details by id
 */
router.get('/:id', function (req, res) {
    //motionModel.find({})
    res.send(require('util').inspect(req.query));
});

router.post('/', function (req, res) {
    res.send('POST1');
});

module.exports = router;
