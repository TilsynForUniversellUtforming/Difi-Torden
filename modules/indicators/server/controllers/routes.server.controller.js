'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Route = mongoose.model('Route'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an Input
 */
exports.create = function(req, res)
{
    var route = new Route(req.body);

    route.save(function(err)
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
            res.json(route);
        }
    });
};

/**
 * Show the current input
 */
exports.read = function(req, res)
{
    // convert mongoose document to JSON
    var route = req.route ? req.route.toJSON() :
    {};

    res.json(route);
};

/**
 * Update an input
 */
exports.update = function(req, res)
{
    var route = req.route;

    route.save(function(err)
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
            res.json(route);
        }
    });
};

/**
 * Delete an route
 */
exports.delete = function(req, res)
{
    var route = req.route;

    route.remove(function(err)
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
            res.json(route);
        }
    });
};

/**
 * List of inputs
 */
exports.list = function(req, res)
{
    Route.find().sort('name').exec(function(err, routes)
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
            res.json(routes);
        }
    });
};

/**
 * routes  middleware
 */
exports.routeById = function(req, res, next, id)
{

    if (!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).send(
        {
            message: 'route ID is invalid'
        });
    }

    Route.findById(id).exec(function(err, route)
    {
        if (err)
        {
            return next(err);
        }
        else if (!route)
        {
            return res.status(404).send(
            {
                message: 'No route with that identifier has been found'
            });
        }
        req.route = route;
        next();
    });
};