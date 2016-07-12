(function()
{
    'use strict';

    angular
        .module('testObjects')
        .controller('testObjectsController', TestObjectsController);

    IndicatorsController.$inject = ['$scope', '$state', '$stateParams', 'indicatorResolve', 'indicatorId', '$window', 'Authentication', 'IndicatorsCreateService', '$http'];

    function IndicatorsController($scope, $state, $stateParams, testObject, testObjectId, $window, Authentication, TestObjectsCreateService, s$http)
    {
        var vm = this;
        //What we are working with
        vm.testObject = testObject;
        //quick n dirty until we change model to final form
        // if (!vm.testObject.requirements) vm.testObject.requirements = [];
        // if (!vm.testObject.activities) vm.testObject.activities = [];

        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        // vm.addActivity = addActivity;
        vm.testObjectId = testObjectId;
        vm.editTestObject = function(id)
        {
            $state.go('testObjects.edit.main',
            {
                testObjectId: testObjectId
            })
        }

        // vm.Requirements = [];

        // vm.addRequirement = addRequirement;
        // vm.removeRequirement = removeRequirement;

        vm.createService = TestObjectsCreateService;
        vm.createService.indicator = vm.indicator;
        vm.listSelected;
        vm.collapseSection = collapseSection;
        vm.collapse = {
            general: false,
            krav: true,
            activities: true,
            routes: true
        };
        vm.getLocation = function(val)
        {
            return $http.get('http://maps.googleapis.com/maps/api/geocode/json',
            {
                params:
                {
                    address: val,
                    sensor: false
                }
            }).then(function(response)
            {
                return response.data.results.map(function(item)
                {
                    return item.formatted_address;
                });
            });
        };

        function collapseSection(section)
        {
            console.log("Collapse!")
            switch (section)
            {
                case 'general':
                    vm.collapse.general = !vm.collapse.general;
                    console.log("general: " + vm.collapse.general);
                    break;
                case 'activities':
                    vm.collapse.activities = !vm.collapse.activities;
                    console.log("activities: " + vm.collapse.activities);
                    break;
                case 'krav':
                    vm.collapse.krav = !vm.collapse.krav;
                    console.log("krav: " + vm.collapse.krav);
                    break;
                case 'routes':
                    vm.collapse.routes = !vm.collapse.routes;
                    break;
            }
        }

        // function addActivity()
        // {
        //     var act = {
        //         title: 'Aktivtet uten navn',
        //         inputs: [],
        //         beskrivelse: '',
        //     }
        //     vm.indicator.activities.push(act);
        //     $state.go('^.activity.form',
        //     {
        //         activityInd: vm.indicator.activities.length - 1
        //     });
        // }

        // function addRequirement(req)
        // {
        //     if (!vm.indicator.requirements) vm.indicator.requirements = [];
        //     vm.indicator.requirements.push(req);
        // }

        // function removeRequirement(req)
        // {
        //     if (typeof req === 'number')
        //         vm.indicator.requirements.splice(req, 1);
        //     else
        //         vm.indicator.requirements.splice(vm.indicator.requirements.indexOf(req), 1);
        // }

        // Remove existing indicator
        function remove()
        {
            if ($window.confirm('Are you sure you want to delete?'))
            {
                vm.indicator.$remove($state.go('indicators.list'));
            }
        }
        // Save indicator
        function save(isValid)
        {
            if (!isValid)
            {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.testObjectForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.indicator._id)
            {
                vm.indicator.$update(successCallback, errorCallback);
            }
            else
            {
                vm.indicator.$save(successCallback, errorCallback);
            }

            function successCallback(res)
            {
                $state.go('testObject.view',
                {
                    testObjectId: res._id
                });
            }

            function errorCallback(res)
            {
                vm.error = res.data.message;
            }
        }
    }
}());