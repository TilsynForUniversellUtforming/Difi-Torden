(function () {
  'use strict';

  angular
    .module('indicators.services')
    .factory('ActivitiesService', ActivitiesService);

  ActivitiesService.$inject = ['$resource'];

  function ActivitiesService($resource) {
    return $resource('api/activities/:activityId', {
      activityId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
