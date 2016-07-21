'use strict';

/**
 * Module dependencies
 */
var picturePolicy = require('../policies/picture.server.policy'),
  picture = require('../controllers/picture.server.controller');

module.exports = function (app) {
 

  // pictures collection routes
  app.route('/api/pictures')
    .get(picturePolicy.isAllowed, picture.list);

  // Single user routes
  app.route('/api/pictures/:userId')
    .get(picturePolicy.isAllowed, picture.read)
    .put(picturePolicy.isAllowed, picture.update)
    .delete(picturePolicy.isAllowed, picture.delete);

  // Finish by binding the user middleware
  app.param('pictureId', picture.pictureByID);
};
