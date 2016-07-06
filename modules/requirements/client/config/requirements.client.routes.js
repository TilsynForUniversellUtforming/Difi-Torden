(function()
{
    'use strict';

    angular
        .module('requirements.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider)
    {
        $stateProvider
            .state('requirements',
            {
                abstract: true,
                url: '/requirements',
                template: '<ui-view/>'
            })
            .state('requirements.list',
            {
                url: '',
                templateUrl: 'modules/requirements/client/views/requirements-list.client.view.html',
                controller: 'RequirementsListController',
                controllerAs: 'vm',
                data:
                {
                    pageTitle: 'Requirements List'
                }
            })       
    }
 
}());