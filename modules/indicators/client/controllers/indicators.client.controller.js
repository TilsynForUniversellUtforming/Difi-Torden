(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('IndicatorsController', IndicatorsController);

    IndicatorsController.$inject = ['$scope', '$state', '$stateParams', 'indicatorResolve','indicatorId', '$window', 'Authentication', 'IndicatorsCreateService', 'ReqsTempService'];

    function IndicatorsController($scope, $state, $stateParams, indicator,indicatorId, $window, Authentication, IndicatorsCreateService, ReqsTempService)
    {
        var vm = this;
        //What we are working with
        vm.indicator = indicator;
        //quick n dirty until we change model to final form
        if(!vm.indicator.requirements)vm.indicator.requirements=[];
        if(!vm.indicator.activities)vm.indicator.activities=[];

        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        vm.addActivity  = addActivity;
        vm.indicatorId=indicatorId;

        vm.editIndicator = function(id){
            $state.go('indicators.edit.main', {indicatorId: indicatorId})
        }

        vm.Requirements = [];

        vm.addRequirement=addRequirement;
        vm.removeRequirement=removeRequirement;

        vm.createService = IndicatorsCreateService;
        vm.createService.indicator = vm.indicator;
        vm.listSelected;
        function addActivity(){
            var act={
                title:'Aktivtet uten navn',
                inputs:[],
                beskrivelse: '',
            }
            vm.indicator.activities.push(act);
            $state.go('^.activity.form', {activityInd: vm.indicator.activities.length-1});
        }
        function addRequirement(req){
            if(!vm.indicator.requirements)vm.indicator.requirements = [];
            vm.indicator.requirements.push(req);
        }
        function removeRequirement(req){
            if(typeof req ==='number')
                vm.indicator.requirements.splice(req, 1);
            else
                vm.indicator.requirements.splice(vm.indicator.requirements.indexOf(req), 1);
        }

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