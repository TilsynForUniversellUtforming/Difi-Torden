(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('IndicatorsController', IndicatorsController);

    IndicatorsController.$inject = ['$scope', '$state', '$stateParams', 'indicatorResolve', 'indicatorId', '$window', 'Authentication', 'IndicatorsCreateService', '$http', 'RequirementsService'];

    function IndicatorsController($scope, $state, $stateParams, indicator, indicatorId, $window, Authentication, IndicatorsCreateService, $http, RequirementsService)
    {
        var vm = this;
        //What we are working with
        vm.indicator = indicator;
        // if( !indicator._id ){
        //     vm.indicator = IndicatorsCreateService.indicator;
        // }
        //quick n dirty until we change model to final form
        if (!vm.indicator.requirements) vm.indicator.requirements = [];
        if (!vm.indicator.activities) vm.indicator.activities = [];
        //service to help with creation or editing, mostly sharing data between indicator, activity an input controllers
        vm.createService = IndicatorsCreateService;
        vm.createService.indicator = vm.indicator;
        //get list of the requirements
        vm.requirements = RequirementsService.query();
        vm.addRequirement = addRequirement;
        vm.removeRequirement = removeRequirement;

        //auth
        vm.authentication = Authentication;

        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        vm.addActivity = addActivity;
        vm.indicatorId = indicatorId;
        vm.editIndicator = editIndicator;
        // vm.Requirements = [];
        // which item in the drag and drop list is currently selected
        vm.listSelected;
        //for simble debugging
        vm.log=function(onj){console.log(onj)}

        vm.collapseSection = collapseSection;
        //Keeps track of which subsections on the main indicator form page are collapsed currently
        vm.collapse = {
            general: false,
            krav: true,
            activities: true,
            routes: true
        };
        //manages collapsing of subsections on indicators main form page
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
        // adds new activity to indicators activities array, navigates to activity from page
        function addActivity()
        {
            var act = {
                title: 'Aktivtet uten navn',
                inputs: [],
                beskrivelse: '',
            }
            vm.indicator.activities.push(act);
            $state.go('^.activity.form',
            {
                activityInd: vm.indicator.activities.length - 1
            });
        }
        //adds a requirement to indicators requirements array
        function addRequirement(req)
        {
            if (!vm.indicator.requirements) vm.indicator.requirements = [];
            vm.indicator.requirements.push(req);
        }
        //removes requirement from indicators requirements array
        function removeRequirement(req)
        {
            if (typeof req === 'number')
                vm.indicator.requirements.splice(req, 1);
            else
                vm.indicator.requirements.splice(vm.indicator.requirements.indexOf(req), 1);
        }
        //navigates to edit page for indicator with specified id
        function editIndicator(id)
        {
            $state.go('indicators.edit.main',
            {
                indicatorId: indicatorId
            })
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
        function save(isValid, options)
        {
            if (!isValid)
            {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.indicatorForm');
                return false;
            }
            console.log("Working with:")
            console.log(vm.indicator)
            // TODO: move create/update logic to service
            if (vm.indicator._id)
            {
                console.log("updating indicator")
                vm.indicator.$update(successCallback, errorCallback);
            }
            else
            {
                console.log("creating new indicator")
                vm.indicator.$save(successCallback, errorCallback);
            }

            function successCallback(res)
            {   if(!options.remainInThisState)
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