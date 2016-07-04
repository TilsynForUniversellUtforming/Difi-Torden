(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('IndicatorsController', IndicatorsController);

    IndicatorsController.$inject = ['$scope', '$state', 'indicatorResolve', '$window', 'Authentication','IndicatorsCreateService'];

    function IndicatorsController($scope, $state, indicator, $window, Authentication,IndicatorsCreateService)
    {
        var vm = this;
        vm.indicator = indicator;
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        vm.addActivity = addActivity;
        vm.removeActivity = removeActivity;

        vm.activity={};
        vm.input={};

        vm.createService = IndicatorsCreateService;
        vm.details = vm.createService.details;

        vm.listSelected;
        vm.indicator.title = "1.2.3 - Indikator Taktil";
        vm.indicator.description = "";
        vm.indicator.activities = [
        {
            title: "Test Act 1",
            description: "Test act 1 description.",
            inputs: [
            {
                text: "Is it blue?",
                type: "yes-no"
            },
            {
                text: "What is 2+2?",
                type: "numeric"
            }]
        },
        {
            title: "Test Act 2",
            description: "Test act 2 description.",
            inputs: [
            {
                text: "Is it green?",
                type: "yes-no"
            },
            {
                text: "What is 3+3?",
                type: "numeric"
            }]
        }]

        // Remove existing indicator
        function remove()
        {
            if ($window.confirm('Are you sure you want to delete?'))
            {
                vm.indicator.$remove($state.go('indicators.list'));
            }
        }
        function addActivity(){
            vm.createService.details = {title:"Aktivitet uten navn", description:"Ingen Beskrivelse", krav:[], inputs:[]}
            vm.indicator.activities.push(vm.createService.details);
            vm.createService.goToView('form-activity', vm.createService.details)
        }
        function removeActivity(obj){
            var index = vm.indicator.activities.indexOf(obj);
            vm.indicator.activities.splice(index, 1);
        }
        // Save indicator
        function save(isValid)
        {
            if (!isValid)
            {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.indicatorForm');
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
                $state.go('indicators.view',
                {
                    indicatorId: res._id
                });
            }

            function errorCallback(res)
            {
                vm.error = res.data.message;
            }
        }
    }
}());