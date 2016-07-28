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

        vm.activity = activity;

        //TODO find out if we still need this
        //in case no saving will take place
        var oldActivity = angular.copy(vm.activity);

        //Inputs of a given activity
        //TODO move it somewhere else, maybe input list ctr or smth
        vm.removeInput = removeInput;
        vm.newInput = newInput;

        // vm.indicatorId = indicatorId;
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
            //TODO remove reference to its ID from the indicator.
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
        //Toggles details of chosen input
        //TODO Make JSON to smth nicer to look at
        function toggleInputDetails(index)
        {
            vm.expandedInputIndex = (vm.expandedInputIndex == index) ? -1 : index;
        }
        //
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
            inp.solution = [];
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
            vm.activity = oldActivity;
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