(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('InputsController', InputsController);

    InputsController.$inject = ['$state', '$stateParams', 'Authentication', 'IndicatorsCreateService'];

    function InputsController($state, $stateParams, Authentication, IndicatorsCreateService)
    {
        var vm = this;
        vm.goBack = goBack;
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
            }
        ];
        function goBack(){
            $state.go('.^')
        }

    }
}());