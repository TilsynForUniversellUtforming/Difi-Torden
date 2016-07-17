'use strict';

/**
 * Module dependencies
 */
var routesPolicy = require('../policies/routes.server.policy'),
    routes = require('../controllers/routes.server.controller');

module.exports = function(app)
{
    // routes collection routes
    app.route('/api/routes').all(routesPolicy.isAllowed)
        .get(routes.list)
        .post(routes.create);

    // Single article routes
    app.route('/api/routes/:routeId').all(routesPolicy.isAllowed)
        .get(routes.read)
        .put(routes.update)
        .delete(routes.delete);

    // Finish by binding the article middleware
    app.param('routeId', routes.routeById);
};