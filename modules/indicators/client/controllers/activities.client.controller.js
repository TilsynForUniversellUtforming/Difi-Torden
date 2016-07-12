(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('ActivitiesController', ActivitiesController);

    ActivitiesController.$inject = ['$scope', '$state', '$stateParams', 'indicatorId', 'Authentication', 'IndicatorsCreateService'];

    function ActivitiesController($scope, $state, $stateParams, indicatorId, Authentication, IndicatorsCreateService)
    {
        var vm = this;

        try
        {
            vm.activity = IndicatorsCreateService.indicator.activities[$stateParams.activityInd];
            vm.activity.id = $stateParams.activityInd;
        }
        catch (e)
        {
            console.log("Something went wrong while retrieving activity")
            console.log(e);
            if ($state.current.name.indexOf('create') >= 0) $state.go('indicators.create.main')
            else $state.go(".^.^.main");
        }
        //in case no saving will take place
        var oldActivity = angular.copy(vm.activity);

        vm.removeInput = removeInput;
        vm.newInput = newInput;
        vm.indicatorId = indicatorId;
        vm.cancel = cancel;
        vm.save = save;
        vm.editInput = editInput;
        vm.localRequirements = getLocalRequirements();

        function getLocalRequirements()
        {
            var local = [];
            for (var i = 0; i < vm.activity.inputs.length; i++)
            {
                for (var j = 0; j < vm.activity.inputs[i].requirements.length; j++)
                {
                    if (local.indexOf(vm.activity.inputs[i].requirements[j]) >= 0)
                    {
                        console.log("dup");
                    }
                    else
                    {
                        local.push(angular.copy(vm.activity.inputs[i].requirements[j]));
                        if (!local[local.length - 1].inputInd)
                        {
                            local[local.length - 1].inputInd = [];
                        }
                        local[local.length - 1].inputInd.push(i + 1);
                    }
                }
            }
            console.log(local)
            return local;
        }

        function editInput(index)
        {
            console.log("go to input edit state")
            if ($state.current.name.indexOf('form') >= 0)
            {
                console.log("we are in form")
                $state.go('.^.input',
                {
                    inputInd: index.toString()
                });
            }
            else
            {
                console.log("we are not in form")
                $state.go('.input',
                {
                    inputInd: index.toString()
                })
            }
        }

        function removeInput(index)
        {
            vm.activity.inputs.splice(index, 1);
        }

        function newInput()
        {
            var inp = {
                text: '',
                type: '',
                mandytory: true,
                alternatives: [],
                requirements: [],
                options: [],
            };
            vm.activity.inputs.push(inp);
            editInput(vm.activity.inputs.length - 1)
        }

        function cancel()
        {
            IndicatorsCreateService.indicator.activities[$stateParams.activityInd] = oldActivity;
            $state.go('.^');
        }

        function save()
        {
            $scope.vm.save(true,
            {
                remainInThisState: true
            });
        }
    }
}());