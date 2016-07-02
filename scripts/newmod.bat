CD ..
CD modules/
MKDIR %1
CD %1

MKDIR client
MKDIR server
MKDIR tests

CD client

MKDIR config
CD config
<nul (set/p z=) > %1.client.routes.js
CD..

MKDIR controllers
CD controllers
<nul (set/p z=) > %1.client.controller.js
CD ..

MKDIR services
CD services
<nul (set/p z=) > %1.client.service.js
CD ..

MKDIR views
CD views
<nul (set/p z=) > %1.client.view.html
CD ..
MKDIR css
<nul (set/p z=) > %1.client.module.js

CD..

CD server

MKDIR config
CD config
<nul (set/p z=) > %1.server.config.js
CD ..

MKDIR controllers
CD controllers
<nul (set/p z=) > %1.server.controller.js
CD ..

MKDIR models
CD models
<nul (set/p z=) > %1.server.model.js
CD ..

MKDIR policies
cd policies
<nul (set/p z=) > %1.server.policy.js
cd ..

MKDIR routes
CD routes
<nul (set/p z=) > %1.server.routes.js
CD ..

CD ..

CD tests
MKDIR server
MKDIR client
CD ..

CD ..

CD ..

CD scripts





