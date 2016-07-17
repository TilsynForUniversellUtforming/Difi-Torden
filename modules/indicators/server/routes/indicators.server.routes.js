'use strict';

/**
 * Module dependencies
 */
var indicatorsPolicy = require('../policies/indicators.server.policy'),
    indicators = require('../controllers/indicators.server.controller');

module.exports = function(app)
{
    // indicators collection routes
    app.route('/api/indicators').all(indicatorsPolicy.isAllowed)
        .get(indicators.list)
        .post(indicators.create);

    app.route('/api/indicators/full').all(indicatorsPolicy.isAllowed)
        .get(indicators.listAll)
    // Single article routes
    app.route('/api/indicators/:indicatorId').all(indicatorsPolicy.isAllowed)
        .get(indicators.read)
        .put(indicators.update)
        .delete(indicators.delete);

    app.route('/api/indicators/:indicatorId/activities').all(indicatorsPolicy.isAllowed)
        .get(indicators.listActivities)


    // Finish by binding the article middleware
    app.param('indicatorId', indicators.indicatorById);
};