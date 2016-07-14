(function (app) {
  'use strict';

  app.registerModule('testTemplates', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('testTemplates.services');
  app.registerModule('testTemplates.routes', ['ui.router', 'core.routes', 'testTemplates.services']);
}(ApplicationConfiguration));
