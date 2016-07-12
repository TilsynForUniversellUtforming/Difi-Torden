(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('InputsController', InputsController);

    InputsController.$inject = ['$state', '$scope', '$stateParams', 'Authentication', 'IndicatorsCreateService', 'RequirementsService'];

    function InputsController($state, $scope, $stateParams, Authentication, IndicatorsCreateService, RequirementsService)
    {
        var vm = this;

        try
        {
            vm.input = IndicatorsCreateService.indicator.activities[$stateParams.activityInd].inputs[$stateParams.inputInd];
        }
        catch (e)
        {
            console.log(e);
            goBack();
        }
        vm.goBack = goBack;
        var oldInput = angular.copy(vm.input);
        vm.cancel = cancel;
        vm.save = save;
        var reqsGlobal = RequirementsService.query();
        var reqsLocal = IndicatorsCreateService.indicator.requirements;
        vm.reqSearch = [reqsGlobal, reqsLocal];
        vm.reqSearchInd = 1;
        vm.addRequirement = addRequirement;
        vm.addAlternative = addAlternative;

        function addRequirement(req)
        {
            if (vm.input.requirements.indexOf(req) >= 0)
            {
                console.log("duplicate! ");
                return;
            }
            vm.input.requirements.push(req);
        }
        vm.alternative = {
            text: '',
            isCorrect: null,
            options:
            {}
        }
        vm.inputTypes =
            [
        {
            name: "yesno",
            name_no: 'Ja / Nei',
            url: "modules/indicators/client/views/inputs/yesNo.html"
        },
        {
            name: "radio",
            name_no: 'Radioknapper',
            url: "modules/indicators/client/views/inputs/radio.html"
        },
        {
            name: "checkbox",
            name_no: 'Checkbox',
            url: "modules/indicators/client/views/inputs/checkbox.html"
        },
        {
            name: "freetext",
            name_no: 'Fritekst',
            url: "modules/indicators/client/views/inputs/freetext.html"
        },
        {
            name: "numeric",
            name_no: 'Numerisk',
            url: "modules/indicators/client/views/inputs/numeric.html"
        },
        {
            name: "picture",
            name_no: 'Bilde',
            url: "modules/indicators/client/views/inputs/picture.html"
        }];

        function addAlternative()
        {
            vm.input.alternatives.push(vm.alternative);
            vm.alternative = {
                text: '',
                isCorrect: null,
                options:
                {}
            };
        }

        function goBack()
        {
            $state.go('.^')
        }

        function cancel()
        {
            IndicatorsCreateService.indicator.activities[$stateParams.activityInd].inputs[$stateParams.inputInd] = oldInput;
            goBack();
        }

        function save()
        {
            $scope.ac.save(true,
            {
                remainInThisState: true
            });
            goBack();
        }

    }
}());