'use strict';

/**
 * Module dependencies
 */
var testObjectsPolicy = require('../policies/testObjects.server.policy'),
  testObjects = require('../controllers/testObjects.server.controller');

module.exports = function (app) {
  // testObjects collection routes
  app.route('/api/testObjects').all(testObjectsPolicy.isAllowed)
    .get(testObjects.list)
    .post(testObjects.create);

  // Single article routes
  app.route('/api/testObjects/:testObjectId').all(testObjectsPolicy.isAllowed)
    .get(testObjects.read)
    .put(testObjects.update)
    .delete(testObjects.delete);

  // Finish by binding the article middleware
  app.param('testObjectId', testObjects.testObjectById);
};
