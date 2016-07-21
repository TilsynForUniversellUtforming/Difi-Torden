'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  mongoose = require('mongoose'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  pictureUpload = mongoose.model('Picture');

exports.save = function (req, res) {
  var pictureUpload = req.pictureUpload;

pictureUpload.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(pictureUpload);
    }
  });
};

exports.read = function (req, res) {
  // convert mongoose document to JSON
  var picture = req.picture ? req.picture.toJSON() : {};

  res.json(picture);
};

/**
 * Delete an pictureUpload
 */
exports.delete = function (req, res) {
  var pictureUpload = req.pictureUpload;

  pictureUpload.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(pictureUpload);
    }
  });
};


exports.list = function (req, res) {
  Picture.find().sort('name').exec(function (err, pictures) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(pictures);
    }
  });
};

exports.update = function (req, res) {
  var picture = req.picture;

  // picture.title = req.body.title;
  // picture.content = req.body.content
  console.log("NOT IMPLEMENTED YET")
  picture.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(picture);
    }
  });
};

/**
 * pictures middleware
 */
exports.pictureByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'picture ID is invalid'
    });
  }

  Picture.findById(id).exec(function (err, picture) {
    if (err) {
      return next(err);
    } else if (!picture) {
      return res.status(404).send({
        message: 'No picture with that identifier has been found'
      });
    }
    req.picture = picture;
    next();
  });
};


  
  