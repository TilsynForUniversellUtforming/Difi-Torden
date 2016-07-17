(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('ActivitiesController', ActivitiesController);

    ActivitiesController.$inject = ['$scope', '$state', '$stateParams', 'activityResolve', 'indicatorId', 'Authentication', 'IndicatorsCreateService', 'ActivitiesService', 'InputsService'];

    function ActivitiesController($scope, $state, $stateParams, activity, indicatorId, Authentication, IndicatorsCreateService, ActivitiesService, InputsService)
    {
        var vm = this;

        try
        {
            // vm.activity = IndicatorsCreateService.indicator.activitiesIds[$stateParams.activityInd];
            console.log("act id: " + $stateParams.activityInd)
            vm.id = $stateParams.activityInd;
            vm.activity = activity;
            console.log(vm.activity)
            // for (var i = 0; i < IndicatorsCreateService.indicator.activitiesIds.length; i++) {
            //     console.log("Loop_"+i)
            //     if (IndicatorsCreateService.indicator.activitiesIds[i]._id && IndicatorsCreateService.indicator.activitiesIds[i]._id == vm.id) {
            //         console.log("Math found")
            //         vm.activity =  IndicatorsCreateService.indicator.activitiesIds[i];
            //         console.log(vm.activity)
            //     }
            // }

        }
        catch (e)
        {
            console.log("Something went wrong while retrieving activity")
            var isCreate = ($state.current.name.indexOf('create') >= 0) ? true : false;
            if (isCreate) $state.go('indicators.create.main')
            else
            {
                try
                {
                    $state.go(".^.^.main");
                }
                catch (e)
                {
                    $state.go('indicators.edit.main',
                    {
                        indicatorId: indicatorId
                    });
                }
            }
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
        vm.toggleInputDetails = toggleInputDetails;
        vm.removeActivity = removeActivity;
        vm.expandedInputIndex = -1;

        function removeActivity(id)
        {
            //TODO add popup warning
            vm.activity.$remove(function(res)
            {
                console.log("removing ok")
            }, function(res)
            {
                console.log('removing not ok')
            })

            $state.go('indicators.edit.main',
            {
                indicatorId: indicatorId
            });

        }

        function toggleInputDetails(index)
        {
            console.log("index is " + index)
            vm.expandedInputIndex = (vm.expandedInputIndex == index) ? -1 : index;
        }

        function getLocalRequirements()
        {
            return [];
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
            var inp = new InputsService();

            inp.text = '';
            inp.type = '';
            inp.mandytory = true;
            inp.alternatives = [];
            inp.requirements = [];
            inp.options = {};

            inp.$save(function(res)
            {
                console.log("creating input succesfull");
                vm.activity.inputs.push(res);
                save();

                editInput(res._id)
            }, function(res)
            {
                console.log("input creation failed");
            })

        }

        function cancel()
        {
            IndicatorsCreateService.indicator.activities[$stateParams.activityInd] = oldActivity;
            $state.go('.^');
        }

        function save()
        {
            if (vm.activity._id)
            {
                vm.activity.$update(succes, err)
            }
            else
            {
                vm.activity.$save(succes, err)
            }

            function succes(res)
            {
                console.log("Activity Updated")
            }

            function err(res)
            {
                console.log("Error, activity not updated")
            }
        }
    }
}());