(function()
{
    'use strict';

    angular
        .module('testObjects.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider)
    {
        $stateProvider
            .state('testObjects',
            {
                abstract: true,
                url: '/testObjects',
                template: '<ui-view/>'
            })
            .state('testObjects.list',
            {
                url: '',
                templateUrl: 'modules/testObjects/client/views/testObjects-list.client.view.html',
                controller: 'TestObjectsListController',
                controllerAs: 'vm',
                data:
                {
                    roles: ['user', 'admin', 'guest'],
                    pageTitle: 'TestObjects List'
                }
            })
            .state('testObjects.create',
            {
                url: '/create',
                views:
                {
                    "":
                    {
                        templateUrl: 'modules/TestObjects/client/views/testObject-creator-main.client.view.html',
                        controller: 'testObjectsController',
                        controllerAs: 'vm',
                    },
                    "side@testObjects.create":
                    {
                        templateUrl: "modules/testObjects/client/views/testObjects-creator-side.client.view.html"
                    },
                },
                resolve:
                {
                    testObjectResolve: newTestObject
                    
                },
                data:
                {
                    roles: ['user', 'admin', 'guest'],
                    pageTitle: 'TestObjects Create'
                }
            })
            .state('testObjects.create.main', {
                url:'/main',
                templateUrl: "modules/testObjects/client/views/testObject-form-main.client.view.html"
            })
            
            
            
           
            // .state('testObjects.edit',
            // {
            //     url: '/:testObjectId/edit',
            //      views:
            //     {
            //         "":
            //         {
            //             templateUrl: 'modules/testObjects/client/views/testObject-creator-main.client.view.html',
            //             controller: 'TestObjectsController',
            //             controllerAs: 'vm',
            //         },
            //         "side@testObjects.edit":
            //         {
            //             templateUrl: "modules/testObjects/client/views/testObject-creator-side.client.view.html"
            //         },
            //     },
            //     resolve:
            //     {
            //         testObjectResolve: getTestObject,
            //         TestObjectId: getTestObjectId
            //     },
            //     data:
            //     {
            //         roles: ['user', 'admin', 'guest'],
            //         pageTitle: 'Edit TestObject '
            //     }
            // })
            // .state('testObjects.edit.main', {
            //     url:'/main',
            //     templateUrl: "modules/testObjects/client/views/testObject-form-main.client.view.html"
            // })

         
          

            // .state('testObjects.view',
            // {
            //     url: '/:indicatorId',
            //     templateUrl: 'modules/testObjects/client/views/view-indicator.client.view.html',
            //     controller: 'TestObjectsController',
            //     controllerAs: 'vm',
            //     resolve:
            //     {
            //         TestObjectResolve: getTestObject,
            //         TestObjectId: getTestObjectId
            //     },
            //     data:
            //     {
            //         pageTitle: 'TestObject {{ testObjectResolve.name }}'
            //     }
            // });
    }
    // getIndicatorId.$inject = ['$stateParams'];
    // function getIndicatorId($stateParams){
    //     if($stateParams.indicatorId)
    //         return $stateParams.indicatorId;
    //     else return {};
    // }
    getTestObject.$inject = ['$stateParams', 'TestObjectsService'];
 function getTestObject($stateParams, TestObjectsService) {
     // body...

        return TestObjectsService.get(
        {
            testObjectId: $stateParams.testObjectId
        }).$promise;
    }

    newTestObject.$inject = ['TestObjectsService'];

    function newTestObject(TestObjectsService)
    {
        return new TestObjectsService();
    }

}());