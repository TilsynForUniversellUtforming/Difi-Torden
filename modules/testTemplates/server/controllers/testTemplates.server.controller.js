'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  TestTemplate = mongoose.model('TestTemplate'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an TestTemplate
 */
exports.create = function (req, res) {
  var testTemplate = new TestTemplate(req.body);
  // TestTemplate.user = req.user;

  testTemplate.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(testTemplate);
    }
  });
};

/**
 * Show the current TestTemplate
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var testTemplate = req.testTemplate ? req.testTemplate.toJSON() : {};

  res.json(testTemplate);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var testTemplate = req.testTemplate;
  testTemplate.title = req.body.title;
  testTemplate.description = req.body.description;
  testTemplate.testObject = req.body.testbject;
  testTemplate.indicators = req.body.indicators;
  

  // testTemplate.title = req.body.title;
  // testTemplate.content = req.body.content
  console.log("NOT IMPLEMENTED YET")
  testTemplate.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(testTemplate);
    }
  });
};

/**
 * Delete an testTemplate
 */
exports.delete = function (req, res) {
  var testTemplate = req.testTemplate;

  testTemplate.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(testTemplate);
    }
  });
};

/**
 * List of testTemplates
 */
exports.list = function (req, res) {
  TestTemplate.find().sort('name').exec(function (err, testTemplates) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(testTemplates);
    }
  });
};

/**
 * testTemplates middleware
 */
exports.testTemplateById = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'testTemplate ID is invalid'
    });
  }

  TestTemplate.findById(id).exec(function (err, testTemplate) {
    if (err) {
      return next(err);
    } else if (!testTemplate) {
      return res.status(404).send({
        message: 'No testTemplate with that identifier has been found'
      });
    }
    req.testTemplate = testTemplate;
    next();
  });
};
