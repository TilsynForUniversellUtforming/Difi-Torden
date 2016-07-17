'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Indicator = mongoose.model('Indicator'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an Indicator
 */
exports.create = function(req, res)
{
    var indicator = new Indicator(req.body);
    // indicator.user = req.user;

    indicator.save(function(err)
    {
        if (err)
        {
            return res.status(400).send(
            {
                message: errorHandler.getErrorMessage(err)
            });
        }
        else
        {
            res.json(indicator);
        }
    });
};

/**
 * Show the current indicator
 */
exports.read = function(req, res)
{
    // convert mongoose document to JSON
    var indicator = req.indicator ? req.indicator.toJSON() :
    {};

    res.json(indicator);
};

/**
 * Update an Indicator
 */
exports.update = function(req, res)
{
    var indicator = req.indicator;

    indicator.title = req.body.title;
    indicator.content = req.body.content
    indicator.activitiesIds = req.body.activitiesIds
    if (req.body.activities)
        indicator.activities = req.body.activities;
    if (req.body.requirements)
        indicator.requirements = req.body.requirements;
    if (req.body.routes)
        indicator.routes = req.body.routes;

    indicator.save(function(err)
    {
        if (err)
        {
            return res.status(400).send(
            {
                message: errorHandler.getErrorMessage(err)
            });
        }
        else
        {
            res.json(indicator);
        }
    });
};

/**
 * Delete an indicator
 */
exports.delete = function(req, res)
{
    var indicator = req.indicator;

    indicator.remove(function(err)
    {
        if (err)
        {
            return res.status(400).send(
            {
                message: errorHandler.getErrorMessage(err)
            });
        }
        else
        {
            res.json(indicator);
        }
    });
};

/**
 * List of Indicators
 */
exports.list = function(req, res)
{
    Indicator.find().sort('name').exec(function(err, indicators)
    {
        if (err)
        {
            return res.status(400).send(
            {
                message: errorHandler.getErrorMessage(err)
            });
        }
        else
        {
            res.json(indicators);
        }
    });
};
exports.listAll = function(req, res)
{
    Indicator.find().populate(
    {
        path: 'activitiesIds',
        populate:
        {
            path: 'inputs',
            model: 'Input'
        }
    }).sort('name').exec(function(err, indicators)
    {
        if (err)
        {
            return res.status(400).send(
            {
                message: errorHandler.getErrorMessage(err)
            });
        }
        else
        {
            res.json(indicators);
        }
    });
};

exports.listActivities = function(req, res)
{
    var indicator = req.indicator ? req.indicator.toJSON() :
    {};

    res.json(indicator.activitiesIds);
}
/**
 * Indicators middleware
 */
exports.indicatorById = function(req, res, next, id)
{

    if (!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).send(
        {
            message: 'Indicator ID is invalid'
        });
    }

    Indicator.findById(id).populate(
    {
        path: 'activitiesIds',
        populate:
        {
            path: 'inputs',
            model: 'Input'
        }
    }).exec(function(err, indicator)
    {
        if (err)
        {
            return next(err);
        }
        else if (!indicator)
        {
            return res.status(404).send(
            {
                message: 'No indicator with that identifier has been found'
            });
        }
        req.indicator = indicator;
        next();
    });
};