(function()
{
    'use strict';

    angular
        .module('testTemplates')
        .controller('testTemplatesController', TestTemplatesController);

    TestTemplatesController.$inject = ['$scope', '$state', '$stateParams', '$window', 'Authentication', 'testTemplateResolve'];

    function TestTemplatesController($scope, $state, $stateParams,  $window, Authentication, testTemplate)
    {
        var vm = this;
        //What we are working with
        vm.testTemplate = testTemplate;
        //quick n dirty until we change model to final form
        // if (!vm.testTemplate.requirements) vm.testTemplate.requirements = [];
        // if (!vm.testTemplate.activities) vm.testTemplate.activities = [];
        console.log(testTemplate)
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
                vm.testTemplate.$remove($state.go('testTemplates.list'));
            }
        }
        // Save indicator
        function save(isValid)
        {
            console.log("hohohhohoho")
            // if (!isValid)
            // {
            //     $scope.$broadcast('show-errors-check-validity', 'vm.form.testTemplateForm');
            //     return false;
            // }

            // TODO: move create/update logic to service
            if (vm.testTemplate._id)
            {
                vm.testTemplate.$update(successCallback, errorCallback);
            }
            else
            {
                vm.testTemplate.$save(successCallback, errorCallback);
            }

            function successCallback(res)
            {
                // $state.go('testTemplate.view',
                // {
                //     testTemplateId: res._id
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