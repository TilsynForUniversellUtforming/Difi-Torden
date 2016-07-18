(function () {
  'use strict';

  angular
    .module('testTemplates.services')
    .factory('TestTemplatesService', TestTemplatesService);

  TestTemplatesService.$inject = ['$resource'];

  function TestTemplatesService($resource) {
    return $resource('api/testTemplates/:testTemplateId', {
      testTemplateId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());