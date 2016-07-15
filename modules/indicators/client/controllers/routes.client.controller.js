(function()
{
    'use strict';

    angular
        .module('indicators')
        .controller('RoutesController', RoutesController);

    RoutesController.$inject = ['$state', '$scope', '$stateParams', 'Authentication', ];

    function RoutesController($state, $scope, $stateParams, Authentication)
    {
        var vm = this;


        function goBack()
        {
            $state.go('.^')
        }

        function cancel()
        {
            
        }



    }
}());