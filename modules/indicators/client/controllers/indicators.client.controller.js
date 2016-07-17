(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('IndicatorsController', IndicatorsController);

    IndicatorsController.$inject = ['$scope', '$state', '$stateParams', 'indicatorResolve', 'indicatorId', '$window', 'Authentication', 'IndicatorsCreateService', '$http', 'RequirementsService', 'ActivitiesService'];

    function IndicatorsController($scope, $state, $stateParams, indicator, indicatorId, $window, Authentication, IndicatorsCreateService, $http, RequirementsService, ActivitiesService)
    {
        var vm = this;
        //What we are working with
        vm.indicator = indicator;
        vm.indicatorId = indicatorId;

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
        console.log(vm.indicator)
        vm.error = null;
        //Indiactor form
        vm.form = {};
        //remove indicator
        vm.remove = remove;
        //save or update
        vm.save = save;
        //add activity to array
        vm.addActivity = addActivity;
        vm.editIndicator = editIndicator;

        // which item in the drag and drop list is currently selected
        vm.listSelected;
        //for simble debugging
        vm.log = function(onj)
        {
            console.log(onj)
        }

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
            var act = new ActivitiesService();
            act.title = "Aktivitet uten navn";
            act.inputs = [];
            act.beskrivelse = "";
            if (!vm.indicator.activitiesIds) vm.indicator.activitiesIds = [];
            act.$save(function(res)
            {
                vm.indicator.activitiesIds.push(res);
                IndicatorsCreateService.save(function(res2)
                {
                    console.log("ok");
                    $state.go('indicators.edit.activity.form',
                    {
                        activityInd: res._id
                    });
                }, function(res2)
                {
                    console.log("feil")
                }),
                function(res)
                {
                    console.log("not good")
                }
            })
            // vm.indicator.activities.push(act);


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
            console.log("CTRL: Working with:")
            console.log(vm.indicator)
            IndicatorsCreateService.save(function(res)
            {
                if (!options)
                    $state.go('indicators.view',
                    {
                        indicatorId: res._id
                    });
                else if (options && options.goToState)
                {
                    $state.go(options.goToState, (options.stateParams ? options.stateParams :
                    {}));
                }
                else
                {

                }
            }, function(res)
            {
                vm.error = res.data.message;
            })

        }
    }
}());