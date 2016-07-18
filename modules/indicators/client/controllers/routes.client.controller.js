(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('RoutesController', RoutesController);

    RoutesController.$inject = ['$state', '$scope', '$stateParams', 'Authentication' ];

    function RoutesController($state, $scope, $stateParams, Authentication)
    {
        var vm = this;
        vm.newRoute = newRoute;
        vm.editRoute = editRoute;
        vm.removeRoute = removeRoute;
        vm.cancel = cancel;
        vm.save = save;

        vm.showform = false;
        vm.route = {};
        vm.printroute = function(){
            console.log(vm.route)
        }
        function newRoute(){
            vm.route = {

            }
            vm.showform = true;
            vm.selectedIndex = 1;
        }
        function editRoute(route){
            vm.showform = true;
            vm.route = route;
        }
        function removeRoute(route){

        }
        function goBack()
        {
            $state.go('.^')
        }
        function cancel()
        {

        }
        function save(){

            if(vm.selectedIndex == 0){
                vm.route.type="GOTO";
                vm.route.targetActivity = vm.route.targetActivity._id;
                console.log( vm.routeEvalTrueGoToInput)
                vm.route.targetInput = vm.route.targetInput ? vm.route.targetInput._id : null;
            }else if (vm.selectedIndex == 1){
                vm.route.type="NEXT";
            }
            console.log(vm.route)
        }




    }
}());