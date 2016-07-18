(function()
{
    'use strict';

    angular
        .module('testObjects')
        .controller('testObjectsController', TestObjectsController);

    TestObjectsController.$inject = ['$scope', '$state', '$stateParams', '$window', 'Authentication', '$http', 'testObjectResolve'];

    function TestObjectsController($scope, $state, $stateParams, testObject,  $window, Authentication, s$http)
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
        
        // vm.getLocation = function(val)
        // {
        //     return $http.get('http://maps.googleapis.com/maps/api/geocode/json',
        //     {
        //         params:
        //         {
        //             address: val,
        //             sensor: false
        //         }
        //     }).then(function(response)
        //     {
        //         return response.data.results.map(function(item)
        //         {
        //             return item.formatted_address;
        //         });
        //     });
        // };

        

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
                vm.testObject.$remove($state.go('testObjects.list'));
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
            if (vm.testObject._id)
            {
                vm.testObject.$update(successCallback, errorCallback);
            }
            else
            {
                vm.testObject.$save(successCallback, errorCallback);
            }

            function successCallback(res)
            {
                // $state.go('testObject.view',
                // {
                //     testObjectId: res._id
                // });
                console.log('save OK')
            }

            function errorCallback(res)
            {
                vm.error = res.data.message;
            }
        }
    }
}());