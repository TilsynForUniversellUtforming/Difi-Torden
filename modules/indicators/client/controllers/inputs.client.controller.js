(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('InputsController', InputsController);

    InputsController.$inject = ['$state', '$scope', '$stateParams', 'inputResolve',
        'Authentication', 'IndicatorsCreateService', 'RequirementsService'
    ];

    function InputsController($state, $scope, $stateParams, input, Authentication, IndicatorsCreateService, RequirementsService)
    {
        var vm = this;
        vm.input = input;

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
        vm.getActivititesList = getActivititesList;

        function getActivititesList()
        {
            // console.log(IndicatorsCreateService)
            return IndicatorsCreateService.indicator.activities;
        }

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
            vm.input = oldInput;
            goBack();
        }

        function save()
        {
            console.log(vm.input)
            console.log("trying to save or update input")
            if (vm.input._id)
            {
                input.$update(function(res)
                {
                    console.log("updating input ok")
                }, function(res)
                {
                    "updating input failed"
                })
            }
            else
            {
                input.$save(function(res)
                {
                    console.log("saving input ok")
                }, function(res)
                {
                    "saving input failed"
                })
            }
            goBack();
        }

    }
}());