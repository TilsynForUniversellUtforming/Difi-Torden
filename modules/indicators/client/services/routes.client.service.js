(function()
{
    'use strict';

    angular
        .module('indicators.services')
        .factory('RoutesService', RoutesService);

    RoutesService.$inject = ['$resource'];

    function RoutesService($resource)
    {
        var service = {
            getResource:getResource,
            getBlankRoute:getBlankRoute,
            route:route
        }
       return service;

       var route = new getResource();

       function getBlankRoute(){
        return getResource();
       }

       function getResource(){
         return $resource('api/routes/:routeId',
        {
            routeId: '@_id'
        },
        {
            update:
            {
                method: 'PUT'
            }
        });
       }
    }
}());