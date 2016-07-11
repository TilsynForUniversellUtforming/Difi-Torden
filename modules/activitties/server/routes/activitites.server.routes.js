'use strict';

/**
 * Module dependencies
 */
var activitiesPolicy = require('../policies/activitites.server.policy'),
    activities = require('../controllers/activitites.server.controller');

module.exports = function(app)
{
    // activitites collection routes
    app.route('/api/activities').all(activitiesPolicy.isAllowed)
        .get(activities.list)
        .post(activities.create);

    // Single requirement routes
    app.route('/api/activities/:activityId').all(activitiesPolicy.isAllowed)
        .get(activities.read)
        .put(activities.update)
        .delete(activities.delete);

    // Finish by binding the requirement middleware
    app.param('activityId', activities.activityByID);
};