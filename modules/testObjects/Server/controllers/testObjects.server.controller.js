'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  TestObject = mongoose.model('TestObject'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an Testobject
 */
exports.create = function (req, res) {
  var testObject = new TestObject(req.body);
  // Testobject.user = req.user;

  testObject.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(testObject);
    }
  });
};

/**
 * Show the current Testobject
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var testObject = req.testObject ? req.testObject.toJSON() : {};

  res.json(testObject);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var testObject = req.testObject;

  // testObject.title = req.body.title;
  // testObject.content = req.body.content
  console.log("NOT IMPLEMENTED YET")
  testObject.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(testObject);
    }
  });
};

/**
 * Delete an testObject
 */
exports.delete = function (req, res) {
  var testObject = req.testObject;

  testObject.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(testObject);
    }
  });
};

/**
 * List of testObjects
 */
exports.list = function (req, res) {
  TestObject.find().sort('name').exec(function (err, testObjects) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(testObjects);
    }
  });
};

/**
 * testObjects middleware
 */
exports.testObjectById = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'testObject ID is invalid'
    });
  }

  TestObject.findById(id).exec(function (err, testObject) {
    if (err) {
      return next(err);
    } else if (!testObject) {
      return res.status(404).send({
        message: 'No testObject with that identifier has been found'
      });
    }
    req.testObject = testObject;
    next();
  });
};
