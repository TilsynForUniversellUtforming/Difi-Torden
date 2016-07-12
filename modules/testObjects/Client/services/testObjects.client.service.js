(function () {
  'use strict';

  angular
    .module('testObjects.services')
    .factory('TestObjectsService', TestObjectsService);

  IndicatorsService.$inject = ['$resource'];

  function TestObjectsService($resource) {
    return $resource('api/testObjects/:testObjectId', {
      testObjectId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());