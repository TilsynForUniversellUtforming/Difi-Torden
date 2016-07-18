'use strict';

/**
 * Module dependencies
 */
var testTemplatesPolicy = require('../policies/testTemplates.server.policy'),
  testTemplates = require('../controllers/testTemplates.server.controller');

module.exports = function (app) {
  // testTemplates collection routes
  app.route('/api/testTemplates').all(testTemplatesPolicy.isAllowed)
    .get(testTemplates.list)
    .post(testTemplates.create);

  // Single article routes
  app.route('/api/testTemplates/:testTemplateId').all(testTemplatesPolicy.isAllowed)
    .get(testTemplates.read)
    .put(testTemplates.update)
    .delete(testTemplates.delete);

  // Finish by binding the article middleware
  app.param('testTemplateId', testTemplates.testTemplateById);
};
