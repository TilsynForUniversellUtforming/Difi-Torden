(function()
{
    'use strict';

    angular
        .module('requirements')
        .controller('RequirementsController', RequirementsController);

    RequirementsController.$inject = ['$scope', '$state', 'requirementResolve', '$window', 'Authentication',

    ];

    function RequirementsController($scope, $state, requirement, $window, Authentication)
    {
        var vm = this;

        vm.requirement = requirement;
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;

        vm.details=null;
        vm.currentView = "main";
        vm.enableDetailsView=enableDetailsView;


        
        console.log(vm.requirement)

        function enableDetailsView(type, item){
            vm.details = item;
            vm.currentView = type;
        }
        // Remove existing indicator
        function remove()
        {
            if ($window.confirm('Are you sure you want to delete?'))
            {
                vm.requirement.$remove($state.go('requirements.list'));
            }
        }

        // Save requirement
        function save()
        {
            console.log ("heihei");
            // if (!isValid)
            // {
            //     $scope.$broadcast('show-errors-check-validity', 'vm.form.requirementForm');
            //     return false;
            // }

            // TODO: move create/update logic to service
            if (vm.requirement._id)
            {
                vm.requirement.$update(successCallback, errorCallback);
            }
            else
            {
                vm.requirement.$save(successCallback, errorCallback);
            }

            function successCallback(res)
            {
                $state.go('requirements.create',
                {
                    requirementId: res._id
                });
            }

            function errorCallback(res)
            {
                vm.error = res.data.message;
            }
        }
    }
}());