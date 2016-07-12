(function (app) {
  'use strict';

  app.registerModule('testObjects', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('testObjects.services');
  app.registerModule('testObjects.routes', ['ui.router', 'core.routes', 'testObjects.services']);
}(ApplicationConfiguration));

