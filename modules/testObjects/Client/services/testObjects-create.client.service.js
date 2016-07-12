(function()
{
    'use strict';

    angular
        .module('testObjects.services')
        .service('TestObjectsCreateService', TestObjectsCreateService);

    function testObjectsCreateService()
    {
        var service = {
            details:
            {},
            views:
            {
                currentView: 'main',
                main: 'main',
                options:
                {}
            },
            goToView: goToView,
            backToMain: backToMain,
            setMainView: setMainView,
            resetMainView: resetMainView,
            testObject: {}
        };

        return service;
        var storedDetails = null;

        function goToView(name, item, options)
        {
            console.log("Current view: " + service.views.currentView + ", going to " + name)
            service.views.currentView = name;
            if (item && item != null && item != undefined)
            {
                service.details = item;
            }
            service.views.options = options;
        }

        function backToMain()
        {
            goToView(service.views.main, storedDetails);
        }

        function setMainView(name, options)
        {
            console.log("setting main view to " + name)
            service.views.main = name;
            if (options.details)
            {
                storedDetails = options.details
            };
        }

        function resetMainView()
        {
            service.views.main = "main";
        }
    }
}());