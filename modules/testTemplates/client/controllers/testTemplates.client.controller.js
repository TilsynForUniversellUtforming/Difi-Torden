(function()
{
    'use strict';

    angular
        .module('testTemplates')
        .controller('testTemplatesController', TestTemplatesController);

    TestTemplatesController.$inject = ['$scope', '$state', '$stateParams', '$window', 'Authentication', 'testTemplateResolve', 'IndicatorsService'];

    function TestTemplatesController($scope, $state, $stateParams,  $window, Authentication, testTemplate, IndicatorsService)
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
        vm.indicators= IndicatorsService.query();
        vm.addIndicator = addIndicator;
        

        //adds a requirement to indicators requirements array
        function addIndicator(req) {
            if (!vm.testTemplate.indicators) vm.testTemplate.indicators = [];
            vm.testTemplate.indicators.push(req);
        }
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
            console.log(vm.testTemplate)
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