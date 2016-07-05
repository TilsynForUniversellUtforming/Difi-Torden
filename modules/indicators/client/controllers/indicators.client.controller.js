(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('IndicatorsController', IndicatorsController);

    IndicatorsController.$inject = ['$scope', '$state', 'indicatorResolve', '$window', 'Authentication','IndicatorsCreateService'];

    function IndicatorsController($scope, $state, indicator, $window, Authentication,IndicatorsCreateService)
    {
        var vm = this;
        vm.indicator = indicator;
        vm.authentication = Authentication;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        vm.addActivity = addActivity;
        vm.removeActivity = removeActivity;
        vm.showInput = showInput;
        vm.goToInputForm=goToInputForm;
        vm.saveInput = saveInput;
        vm.addAnswerAlternative=addAnswerAlternative;
        vm.activity={};
        vm.input={};

        vm.createService = IndicatorsCreateService;
        vm.details = vm.createService.details;

        vm.listSelected;
        vm.indicator.title = "1.2.3 - Indikator Taktil";
        vm.indicator.description = "";
        vm.indicator.activities = [
        {
            title: "Test Act 1",
            description: "Test act 1 description.",
            inputs: [
            {
                text: "Is it blue?",
                type: "yesno"
            },
            {
                text: "What is 2+2?",
                type: "numeric"
            }]
        },
        {
            title: "Test Act 2",
            description: "Test act 2 description.",
            inputs: [
            {
                text: "Is it green?",
                type: "yesno"
            },
            {
                text: "What is 3+3?",
                type: "numeric"
            }]
        }]

        vm.inputTypes = [{
            name: "yesno",
            name_no: 'Ja / Nei',
            url: "modules/indicators/client/views/inputs/yesNo.html"
        }, {
            name: "radio",
            name_no: 'Radioknapper',
            url: "modules/indicators/client/views/inputs/radio.html"
        }, {
            name: "checkbox",
            name_no: 'Checkbox',
            url: "modules/indicators/client/views/inputs/checkbox.html"
        }, {
            name: "freetext",
            name_no: 'Fritekst',
            url: "modules/indicators/client/views/inputs/freetext.html"
        }, {
            name: "numeric",
            name_no: 'Numerisk',
            url: "modules/indicators/client/views/inputs/numeric.html"
        }, {
            name: "picture",
            name_no: 'Bilde',
            url: "modules/indicators/client/views/inputs/picture.html"
        }];
        function addAnswerAlternative(){
            console.log(vm.input.options.alternative)
            if(!vm.input.alternatives)vm.input.alternatives = [];
            vm.input.alternatives.push(vm.input.options.alternative);
            vm.input.options.alternative = {};
        }
        function saveInput(input){
            if(!input.options.isNew){
                // input.options.activity.inputs.push(input);
                console.log(input.options)
            }else{
                input.options.activity.inputs.push(input);
            }
            console.log("printing input: ")
            console.log(input)
        }
        function showInput(type){
            vm.inputShow = true;
            console.log(type)
            vm.input.options.type = type;
            vm.input.type = type.name;
        }
        function editInput(input){
            vm.createService.setMainView(vm.createService.views.currentView, {details: vm.createService.details});
            vm.createService.goToView('input-form', input, {header:"Endre registrering"});
            vm.input = input;
            vm.input.options = {activity:vm.createService.details};
            for(var i = 0; i < vm.inputTypes.length; i++){
                if(vm.inputTypes[i].name === input.type)
                {
                    showInput(vm.inputTypes[i]);
                }
            }
        }
        function goToInputForm(activity, input, options = {}){
            if(options.edit && options.edit==true){
                editInput(input);
            }else{
                vm.createService.setMainView(vm.createService.views.currentView, {details: activity});
                vm.createService.goToView('input-form', input, {header:"Ny registrering"});
                vm.input = {};
                vm.input.options = {isNew : true, activity:activity};
                showInput(vm.inputTypes[0])
            }
        }
        // Remove existing indicator
        function remove()
        {
            if ($window.confirm('Are you sure you want to delete?'))
            {
                vm.indicator.$remove($state.go('indicators.list'));
            }
        }
        function addActivity(){
            vm.createService.details = {title:"Aktivitet uten navn", description:"Ingen Beskrivelse", krav:[], inputs:[]}
            vm.indicator.activities.push(vm.createService.details);
            vm.createService.goToView('form-activity', vm.createService.details)
        }
        function removeActivity(obj){
            var index = vm.indicator.activities.indexOf(obj);
            vm.indicator.activities.splice(index, 1);
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