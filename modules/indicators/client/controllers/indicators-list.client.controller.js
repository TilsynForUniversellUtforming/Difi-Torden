(function () {
  'use strict';

  angular
    .module('indicators')
    .controller('IndicatorsListController', IndicatorsListController);

  IndicatorsListController.$inject = ['IndicatorsService'];

  function IndicatorsListController(IndicatorsService) {
    var vm = this;

    vm.indicators = IndicatorsService.query();
  }
}());
