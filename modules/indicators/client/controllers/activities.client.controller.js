(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('ActivitiesController', ActivitiesController);

    ActivitiesController.$inject = ['$state', '$stateParams','indicatorId', 'Authentication', 'IndicatorsCreateService'];

    function ActivitiesController($state, $stateParams, indicatorId, Authentication, IndicatorsCreateService)
    {
        var vm = this;
        console.log("state params: " + $stateParams.activityInd)
        console.log(IndicatorsCreateService)
        vm.indicator = IndicatorsCreateService.indicator;
        vm.activity = IndicatorsCreateService.indicator.activities[$stateParams.activityInd];
        vm.activity.id = $stateParams.activityInd;
        vm.removeInput = removeInput;
        vm.newInput = newInput;
        vm.indicatorId=indicatorId;

        function removeInput(index){
            vm.activity.inputs.splice(index, 1);
        }
        function newInput(){
            var inp = {
                id:vm.activity.inputs.length,
                text:'',
                type:'',
                alternatives:[],
                options:[],
            };
            vm.activity.inputs.push(inp);
            $state.go('.^.input', {inputInd:inp.id.toString()});
        }
    }
}());