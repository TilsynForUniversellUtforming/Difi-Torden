// (function () {
//   'use strict';

//   angular
//     .module('indicators')
//     .controller('IndicatorsController', IndicatorsController);

//   IndicatorsController.$inject = ['$scope', '$state', 'indicatorResolve', '$window', 'Authentication'];

//   function IndicatorsController($scope, $state, indicator, $window, Authentication) {
//     var vm = this;

//     vm.indicator = indicator;
//     vm.authentication = Authentication;
//     vm.error = null;
//     vm.form = {};
//     vm.remove = remove;
//     vm.save = save;

//     // Remove existing indicator
//     function remove() {
//       if ($window.confirm('Are you sure you want to delete?')) {
//         vm.indicator.$remove($state.go('indicators.list'));
//       }
//     }

//     // Save indicator
//     function save(isValid) {
//       if (!isValid) {
//         $scope.$broadcast('show-errors-check-validity', 'vm.form.indicatorForm');
//         return false;
//       }

//       // TODO: move create/update logic to service
//       if (vm.indicator._id) {
//         vm.indicator.$update(successCallback, errorCallback);
//       } else {
//         vm.indicator.$save(successCallback, errorCallback);
//       }

//       function successCallback(res) {
//         $state.go('indicators.view', {
//           indicatorId: res._id
//         });
//       }

//       function errorCallback(res) {
//         vm.error = res.data.message;
//       }
//     }
//   }
// }());
