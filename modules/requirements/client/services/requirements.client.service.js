(function () {
  'use strict';

  angular
    .module('requirements.services')
    .factory('RequirementsService', RequirementsService);

  RequirementsService.$inject = ['$resource'];

  function RequirementsService($resource) {
    return $resource('api/requirements/:requirementId', {
      requirementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
