'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke TestObjects Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/testObjects',
      permissions: '*'
    }, {
      resources: '/api/testObjects/:testObjectId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/testObjects',
      permissions: ['*']
    }, {
      resources: '/api/TestObjects/:testObjectId',
      permissions: ['*']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/TestObjects',
      permissions: ['*']
    }, {
      resources: '/api/TestObjects/:testObjectId',
      permissions: ['*']
    }]
  }]);
};

/**
 * Check If TestObjects Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];
return next();
  // If an article is being processed and the current user created it then allow any manipulation
  if (req.TestObject && req.user && req.TestObject.user && req.TestObject.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};