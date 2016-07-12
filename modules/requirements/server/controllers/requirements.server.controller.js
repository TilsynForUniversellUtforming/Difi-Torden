'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Requirement = mongoose.model('Requirement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function (req, res) {
  var requirement = new Requirement(req.body);
  requirement.user = req.user;

  requirement.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(requirement);
    }
  });
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var requirement = req.requirement ? req.requirement.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  // requirement.isCurrentUserOwner = !!(req.user && requirement.user && requirement.user._id.toString() === req.user._id.toString());

  res.json(requirement);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var requirement = req.requirement;
  requirement.nr_v9 = req.body.nr_v9;
  requirement.req_in_standard = req.body.req_in_standard;
  requirement.standard = req.body.standard;
  requirement.chapter_title = req.body.chapter_title;
  requirement.level = req.body.level;
  requirement.category = req.body.category;

  requirement.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(requirement);
    }
  });
};

/**
 * Delete an requirement
 */
exports.delete = function (req, res) {
  var requirement = req.requirement;

  requirement.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(requirement);
    }
  });
};

/**
 * List of requirements
 */
exports.list = function (req, res) {
  Requirement.find().sort('created').exec(function (err, requirements) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(requirements);
    }
  });
};

/**
 * Article middleware
 */
exports.requirementByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'requirement is invalid'
    });
  }

  Requirement.findById(id).exec(function (err, requirement) {
    if (err) {
      return next(err);
    } else if (!requirement) {
      return res.status(404).send({
        message: 'No requirement with that identifier has been found'
      });
    }
    req.requirement = requirement;
    next();
  });
};
