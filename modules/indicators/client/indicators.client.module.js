(function (app) {
  'use strict';

  app.registerModule('indicators', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('indicators.services');
  app.registerModule('indicators.routes', ['ui.router', 'core.routes', 'indicators.services']);
}(ApplicationConfiguration));
