(function()
{
    'use strict';

    angular
        .module('indicators.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider)
    {
        $stateProvider
            .state('indicators',
            {
                abstract: true,
                url: '/indicators',
                template: '<ui-view/>'
            })
            .state('indicators.list',
            {
                url: '',
                templateUrl: 'modules/indicators/client/views/indicators-list.client.view.html',
                controller: 'IndicatorsListController',
                controllerAs: 'vm',
                data:
                {
                    pageTitle: 'Indicators List'
                }
            })
            .state('indicators.create',
            {
                url: '/create',
                views:
                {
                    "":
                    {
                        templateUrl: 'modules/indicators/client/views/creator-main.client.view.html',
                        controller: 'IndicatorsController',
                        controllerAs: 'vm',
                    },
                    "side@indicators.create":
                    {
                        templateUrl: "modules/indicators/client/views/creator-side.client.view.html"
                    },
                },
                resolve:
                {
                    indicatorResolve: newIndicator,
                    indicatorId: getIndicatorId
                },
                data:
                {
                    roles: ['user', 'admin', 'guest'],
                    pageTitle: 'Indicators Create'
                }
            })
            .state('indicators.create.main', {
                url:'/main',
                templateUrl: "modules/indicators/client/views/indicator-form-main.client.view.html"
            })
            .state('indicators.create.activity', {
                url:"/activity/:activityInd",
                params:{
                    activityInd:{
                        value:'0',
                        squash:false
                    }
                },
                views:{
                    "":{
                        templateUrl:"modules/indicators/client/views/activity-details.client.view.html",
                        controller: 'ActivitiesController',
                        controllerAs: 'ac'
                    },
                     "input-details-main@indicators.form.activity.details":
                    {
                        templateUrl: "modules/indicators/client/views/input-details-main.client.view.html"
                    },
                }
            })
            .state('indicators.create.activity.form', {
                url:"/form",
                views:{
                    "":{
                        templateUrl:"modules/indicators/client/views/activity-form.client.view.html",
                        controller:'ActivitiesController',
                        controllerAs:'ac'
                    },
                     "input-details-main@indicators.form.activity.form":
                    {
                        templateUrl: "modules/indicators/client/views/input-details-main.client.view.html"
                    }
                }
            })
            .state('indicators.create.activity.input', {
                url:"/input/:inputInd",
                 params:{
                    inputInd:{
                        value:'0',
                        squash:false
                    }
                },
                controller:'InputsController',
                controllerAs:'ic',
                templateUrl: "modules/indicators/client/views/input-form.client.view.html"

            })
            .state('indicators.form.input.detail', {
                url:"/details/:id",
                templateUrl:"modules/indicators/client/views/input-details.client.view.html"
            })
            .state('indicators.form.input.form', {
                url:"/form",
                templateUrl:"modules/indicators/client/views/input-form.client.view.html"
            })

            .state('indicators.edit',
            {
                url: '/:indicatorId/edit',
                 views:
                {
                    "":
                    {
                        templateUrl: 'modules/indicators/client/views/creator-main.client.view.html',
                        controller: 'IndicatorsController',
                        controllerAs: 'vm',
                    },
                    "side@indicators.edit":
                    {
                        templateUrl: "modules/indicators/client/views/creator-side.client.view.html"
                    },
                },
                resolve:
                {
                    indicatorResolve: getIndicator,
                    indicatorId: getIndicatorId
                },
                data:
                {
                    roles: ['user', 'admin', 'guest'],
                    pageTitle: 'Edit Indicator {{ indicatorResolve.name }}'
                }
            })
            .state('indicators.edit.main', {
                url:'/main',
                templateUrl: "modules/indicators/client/views/indicator-form-main.client.view.html"
            })

            .state('indicators.edit.activity', {
                url:"/activity/:activityInd",
                params:{
                    activityInd:{
                        value:'0',
                        squash:false
                    }
                },
                views:{
                    "":{
                        templateUrl:"modules/indicators/client/views/activity-details.client.view.html",
                        controller: 'ActivitiesController',
                        controllerAs: 'ac'
                    },
                    "input-details-main@indicators.edit.activity":
                    {
                        templateUrl: "modules/indicators/client/views/input-details-main.client.view.html"
                    },
                },
                 onEnter:function(){console.log("entering activity ")}
            })
            .state('indicators.edit.activity.form', {
                url:"/form",
                views:{
                    "":{
                        templateUrl:"modules/indicators/client/views/activity-form.client.view.html",
                        controller:'ActivitiesController',
                        controllerAs:'ac'
                    },
                    "input-details-main@indicators.edit.activity.form":
                    {
                        templateUrl: "modules/indicators/client/views/input-details-main.client.view.html"
                    }
                },
                onEnter:function(){console.log("entering activity form")}
            })
            .state('indicators.edit.activity.input', {
                url:"/input/:inputInd",
                params:{
                    inputInd:{
                        value:'0',
                        squash:false
                    },
                },
                controller:'InputsController',
                controllerAs:'ic',
                templateUrl: "modules/indicators/client/views/input-form.client.view.html"

            })

            .state('indicators.view',
            {
                url: '/:indicatorId',
                templateUrl: 'modules/indicators/client/views/view-indicator.client.view.html',
                controller: 'IndicatorsController',
                controllerAs: 'vm',
                resolve:
                {
                    indicatorResolve: getIndicator,
                    indicatorId: getIndicatorId
                },
                data:
                {
                    pageTitle: 'Indicator {{ indicatorResolve.name }}'
                }
            });
    }
    getIndicatorId.$inject = ['$stateParams'];
    function getIndicatorId($stateParams){
        if($stateParams.indicatorId)
            return $stateParams.indicatorId;
        else return {};
    }
    getIndicator.$inject = ['$stateParams', 'IndicatorsService'];

    function getIndicator($stateParams, IndicatorsService)
    {
        var indicators =
        [
            {
            _id: "100",
            title:"test 1 ",
            description: "test 1 desc",
            activities: [
            {
                title: "test 1 act 1",
                description : "test 1 act 1 desc",
                inputs: [{
                    text: "test 1 act 1 input 1",
                    type:"yesno",
                },{
                    text: "another test 1 act1 input 2",
                    type:"freetext"
                }]
            },
            {
                title: "test 1 act 2",
                description : "test 1 act 2 desc",
                inputs: [{
                    text: "test 1 act 2 input 1",
                    type:"yesno",
                },{
                    text: "another test 1 act 2 input 2",
                    type:"freetext"
                }]
            }
            ]
            },
            {
                _id: "101",
                title:"test 2 ",
                description: "test 2 desc",
                activities: [
                {
                    title: "test 2 act 1",
                    description : "test 2 act 1 desc",
                    inputs: [{
                        text: "test 2 act 1 input 1",
                        type:"yesno",
                    },{
                        text: "another test 2 act1 input 2",
                        type:"freetext"
                    }]
                },
                {
                    title: "test 2 act 2",
                    description : "test 2 act 2 desc",
                    inputs: [{
                        text: "test 2 act 2 input 1",
                        type:"yesno",
                    },{
                        text: "another test 2 act 2 input 2",
                        type:"freetext"
                    }]
                }
                ]
            }
        ];
        for(var i = 0; i < indicators.length ; i++){
            if(indicators[i]._id == $stateParams.indicatorId)
            {
                return indicators[i]
            }
        }
        return {error:"shit happens"};

        return IndicatorsService.get(
        {
            indicatorId: $stateParams.indicatorId
        }).$promise;
    }

    newIndicator.$inject = ['IndicatorsService'];

    function newIndicator(IndicatorsService)
    {
        return new IndicatorsService();
    }

}());