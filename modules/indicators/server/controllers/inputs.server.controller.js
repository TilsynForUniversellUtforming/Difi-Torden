'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Input = mongoose.model('Input'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an Input
 */
exports.create = function(req, res)
{
    var input = new Input(req.body);


    input.save(function(err)
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
            res.json(input);
        }
    });
};

/**
 * Show the current input
 */
exports.read = function(req, res)
{
    // convert mongoose document to JSON
    var input = req.input ? req.input.toJSON() :
    {};

    res.json(input);
};

/**
 * Update an input
 */
exports.update = function(req, res)
{
    var input = req.input;

    input.text = req.body.text;
    input.type = req.body.type;
    input.mandytory = req.body.mandytory;
    input.alternatives = req.body.alternatives;
    input.options = req.body.options;
    if (req.body.requirements)
        input.requirements = req.body.requirements;
    if (req.body.routes)
        input.routes = req.body.routes;

    input.save(function(err)
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
            res.json(input);
        }
    });
};

/**
 * Delete an input
 */
exports.delete = function(req, res)
{
    var input = req.input;

    input.remove(function(err)
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
            res.json(input);
        }
    });
};

/**
 * List of inputs
 */
exports.list = function(req, res)
{
    Input.find().sort('name').exec(function(err, inputs)
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
            res.json(inputs);
        }
    });
};

/**
 * inputs  middleware
 */
exports.inputById = function(req, res, next, id)
{

    if (!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(400).send(
        {
            message: 'Indicator ID is invalid'
        });
    }

    Input.findById(id).exec(function(err, input)
    {
        if (err)
        {
            return next(err);
        }
        else if (!input)
        {
            return res.status(404).send(
            {
                message: 'No input with that identifier has been found'
            });
        }
        req.input = input;
        next();
    });
};