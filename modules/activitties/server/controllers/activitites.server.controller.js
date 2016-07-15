'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Activity = mongoose.model('Activity'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an activity
 */
exports.create = function(req, res)
{
    var activity = new Activity(req.body);
    activity.user = req.user;

    activity.save(function(err)
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
            res.json(activity);
        }
    });
};

/**
 * Show the current activity
 */
exports.read = function(req, res)
{
    // convert mongoose document to JSON
    var activity = req.activity ? req.activity.toJSON() :
    {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    // activity.isCurrentUserOwner = !!(req.user && activity.user && activity.user._id.toString() === req.user._id.toString());

    res.json(activity);
};

/**
 * Update an activity
 */
exports.update = function(req, res)
{
    var activity = req.activity;


    activity.save(function(err)
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
            res.json(activity);
        }
    });
};

/**
 * Delete an activity
 */
exports.delete = function(req, res)
{
    var activity = req.activity;

    activity.remove(function(err)
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
            res.json(activity);
        }
    });
};

/**
 * List of activities
 */
exports.list = function(req, res)
{
    Activity.find().sort('created').exec(function(err, activities)
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
            res.json(activities);
        }
    });
};

/**
 * Article middleware
 */
exports.activityByID = function(req, res, next, id)
{

    if (!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).send(
        {
            message: 'activity is invalid'
        });
    }

    Activity.findById(id).exec(function(err, activity)
    {
        if (err)
        {
            return next(err);
        }
        else if (!activity)
        {
            return res.status(404).send(
            {
                message: 'No activity with that identifier has been found'
            });
        }
        req.activity = activity;
        next();
    });
};