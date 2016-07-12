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


        .state('requirements.edit', {
            url: '/:requirementId/edit',
            templateUrl: 'modules/requirements/client/views/requirements-create.client.view.html',
            controller: 'RequirementsController',
            controllerAs: 'vm',
            resolve: 
            {
              requirementResolve: getRequirement
            },
           data: 
           {
             pageTitle: 'requirement edit'
           }
      })

        .state('requirements.create',
        {
            url: '/create',
            templateUrl: 'modules/requirements/client/views/requirements-create.client.view.html',
            controller: 'RequirementsController',
            controllerAs: 'vm',
            resolve: 
            {
                requirementResolve: newRequirement
            },
            data:
            {
                pageTitle: 'Requirements create'
            }
        })            
    }

    getRequirement.$inject = ['$stateParams', 'RequirementsService'];

    function getRequirement($stateParams, RequirementsService) {
        return RequirementsService.get({
          requirementId: $stateParams.requirementId
      }).$promise;
    }


    newRequirement.$inject = ['RequirementsService'];

    function newRequirement(RequirementsService) {
        return new RequirementsService();
    }

}());