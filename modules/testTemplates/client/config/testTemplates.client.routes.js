(function()
{
    'use strict';

    angular
        .module('testTemplates.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider)
    {
        $stateProvider
            .state('testTemplates',
            {
                abstract: true,
                url: '/testTemplates',
                template: '<ui-view/>'
            })
            .state('testTemplates.list',
            {
                url: '',
                templateUrl: 'modules/testTemplates/client/views/testTemplates-list.client.view.html',
                controller: 'TestTemplatesListController',
                controllerAs: 'vm',
                data:
                {
                    roles: ['user', 'admin', 'guest'],
                    pageTitle: 'TestTemplates List'
                }
            })
            .state('testTemplates.create',
            {
                url: '/create',
                views:
                {
                    "":
                    {
                        templateUrl: 'modules/TestTemplates/client/views/testTemplate-creator-main.client.view.html',
                        controller: 'testTemplatesController',
                        controllerAs: 'vm',
                    },
                    "side@testTemplates.create":
                    {
                        templateUrl: "modules/testTemplates/client/views/testTemplate-creator-side.client.view.html"
                    },
                },
                resolve:
                {
                    testTemplateResolve: newTestTemplate
                    
                },
                data:
                {
                    roles: ['user', 'admin', 'guest'],
                    pageTitle: 'TestTemplates Create'
                }
            })
            .state('testTemplates.create.main', {
                url:'/main',
                templateUrl: "modules/testTemplates/client/views/testTemplate-form-main.client.view.html"
            })
            
            
            
           
            // .state('testTemplates.edit',
            // {
            //     url: '/:testTemplateId/edit',
            //      views:
            //     {
            //         "":
            //         {
            //             templateUrl: 'modules/testTemplates/client/views/testTemplate-creator-main.client.view.html',
            //             controller: 'TestTemplatesController',
            //             controllerAs: 'vm',
            //         },
            //         "side@testTemplates.edit":
            //         {
            //             templateUrl: "modules/testTemplates/client/views/testTemplate-creator-side.client.view.html"
            //         },
            //     },
            //     resolve:
            //     {
            //         testTemplateResolve: getTestTemplate,
            //         TestTemplateId: getTestTemplateId
            //     },
            //     data:
            //     {
            //         roles: ['user', 'admin', 'guest'],
            //         pageTitle: 'Edit TestTemplate '
            //     }
            // })
            // .state('testTemplates.edit.main', {
            //     url:'/main',
            //     templateUrl: "modules/testTemplates/client/views/testTemplate-form-main.client.view.html"
            // })

         
          

            // .state('testTemplates.view',
            // {
            //     url: '/:indicatorId',
            //     templateUrl: 'modules/testTemplates/client/views/view-indicator.client.view.html',
            //     controller: 'TestTemplatesController',
            //     controllerAs: 'vm',
            //     resolve:
            //     {
            //         TestTemplateResolve: getTestTemplate,
            //         TestTemplateId: getTestTemplateId
            //     },
            //     data:
            //     {
            //         pageTitle: 'TestTemplate {{ testTemplateResolve.name }}'
            //     }
            // });
    }
    // getIndicatorId.$inject = ['$stateParams'];
    // function getIndicatorId($stateParams){
    //     if($stateParams.indicatorId)
    //         return $stateParams.indicatorId;
    //     else return {};
    // }
    getTestTemplate.$inject = ['$stateParams', 'TestTemplatesService'];
 function getTestTemplate($stateParams, TestTemplatesService) {
     // body...

        return TestTemplatesService.get(
        {
            testTemplateId: $stateParams.testTemplateId
        }).$promise;
    }

    newTestTemplate.$inject = ['TestTemplatesService'];

    function newTestTemplate(TestTemplatesService)
    {
        return new TestTemplatesService();
    }

}());