(function () {
  'use strict';

  angular
    .module('indicators.services')
    .factory('IndicatorsService', IndicatorsService);

  IndicatorsService.$inject = ['$resource'];

  function IndicatorsService($resource) {
    return $resource('api/indicators/:indicatorId', {
      indicatorId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
