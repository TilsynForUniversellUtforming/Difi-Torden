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
                        templateUrl: 'modules/indicators/client/views/form-indicator.client.view.html',
                        controller: 'IndicatorsController',
                        controllerAs: 'vm',
                    },
                    "side@indicators.create":
                    {
                        templateUrl: "modules/indicators/client/views/form-indicator-side.client.view.html"
                    },
                    "ind-general@indicators.create":
                    {
                        templateUrl: "modules/indicators/client/views/form-indicator-main.client.view.html"
                    }
                },
                resolve:
                {
                    indicatorResolve: newIndicator
                },
                data:
                {
                    roles: ['user', 'admin', 'guest'],
                    pageTitle: 'Indicators Create'
                }
            })
            .state('indicators.edit',
            {
                url: '/:indicatorId/edit',
                templateUrl: 'modules/indicators/client/views/form-indicator.client.view.html',
                controller: 'IndicatorsController',
                controllerAs: 'vm',
                resolve:
                {
                    indicatorResolve: getIndicator
                },
                data:
                {
                    roles: ['user', 'admin', 'guest'],
                    pageTitle: 'Edit Indicator {{ indicatorResolve.name }}'
                }
            })
            .state('indicators.view',
            {
                url: '/:articleId',
                templateUrl: 'modules/indicators/client/views/view-indicator.client.view.html',
                controller: 'IndicatorsController',
                controllerAs: 'vm',
                resolve:
                {
                    indicatorResolve: getIndicator
                },
                data:
                {
                    pageTitle: 'Indicator {{ indicatorResolve.name }}'
                }
            });
    }

    getIndicator.$inject = ['$stateParams', 'IndicatorsService'];

    function getIndicator($stateParams, IndicatorsService)
    {
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