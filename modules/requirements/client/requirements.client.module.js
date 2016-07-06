(function (app) {
  'use strict';

  app.registerModule('requirements', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('requirements.services');
  app.registerModule('requirements.routes', ['ui.router', 'core.routes', 'requirements.services']);
}(ApplicationConfiguration));