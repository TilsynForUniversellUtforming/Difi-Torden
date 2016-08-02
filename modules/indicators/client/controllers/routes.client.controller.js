(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('RoutesController', RoutesController);

    RoutesController.$inject = ['$state', '$scope', '$stateParams', 'Authentication'];

    function RoutesController($state, $scope, $stateParams, Authentication)
    {
        console.log("ROUTES CONTROLLER REPOTING")
        var vm = this;
        vm.newRoute = newRoute;
        vm.editRoute = editRoute;
        vm.removeRoute = removeRoute;
        vm.cancel = cancel;
        vm.save = save;

        vm.addInput = addInput;
        vm.addCondition = addCondition;
        vm.prepareCondField = prepareCondField;
        vm.showform = false;
        vm.route = {
            condition:
            {
                type: '',
                inputs: [
                ],
                conditions: []
            },
            onEvalTrue:
            {}
        };
        vm.printroute = function()
        {
            console.log(vm.route)
        }

        function newRoute()
        {
            vm.route = {

            }
            vm.showform = true;
            vm.selectedIndex = 1;
        }

        function editRoute(route)
        {
            vm.showform = true;
            vm.route = route;
        }

        function removeRoute(route)
        {

        }

        function goBack()
        {
            $state.go('.^')
        }

        function cancel()
        {

        }

        function save()
        {

            if (vm.selectedIndex == 0)
            {
                vm.route.type = "GOTO";
                vm.route.targetActivity = vm.route.targetActivity._id;
                console.log(vm.routeEvalTrueGoToInput)
                vm.route.targetInput = vm.route.targetInput ? vm.route.targetInput._id : null;
            }
            else if (vm.selectedIndex == 1)
            {
                vm.route.type = "NEXT";
            }
            console.log(vm.route)
        }

        function addInput(parent)
        {
            console.log("adding input");
            console.log(parent)
            if (!parent.inputs) parent.inputs = [];
            var obj = {
                id: '',
                values: []
            }
            parent.inputs.push(obj)
        }

        function addCondition(parent)
        {
            if (!parent.conditions) parent.conditions = [];
            var obj = {
                type: '',
                inputs: [],
                conditions: []
            }
            parent.conditions.push(obj)
        }

        function prepareCondField(input, parent)
        {
            parent.type = input.type;
            if(!parent.values)parent.values = [];
            // parent.values = input.alternatives;
            // if (input.type === "yesno")
            // {
            //     parent.values = [
            //     {
            //         text: "Ja",
            //         selected: true
            //     }]

            // }
        }



    }
}());