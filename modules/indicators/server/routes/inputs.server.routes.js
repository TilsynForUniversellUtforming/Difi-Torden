'use strict';

/**
 * Module dependencies
 */
var inputsPolicy = require('../policies/inputs.server.policy'),
    inputs = require('../controllers/inputs.server.controller');

module.exports = function(app)
{
    // inputs collection routes
    app.route('/api/inputs').all(inputsPolicy.isAllowed)
        .get(inputs.list)
        .post(inputs.create);

    // Single input routes
    app.route('/api/inputs/:inputId').all(inputsPolicy.isAllowed)
        .get(inputs.read)
        .put(inputs.update)
        .delete(inputs.delete);

    // Finish by binding the article middleware
    app.param('inputId', inputs.inputById);
};