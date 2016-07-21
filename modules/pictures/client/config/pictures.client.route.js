(function()
{
    'use strict';


  // Setting up route
  angular
    .module('pictures.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
      .state('pictures', {
        abstract: true,
        url: '/pictures',
        template: '<ui-view/>',

        })
      .state('pictures.upload', {
        url: '/upload',
        templateUrl: 'modules/pictures/client/views/picture-upload.client.view.html',
        controller: 'PictureController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'picture'
        }
      })

  }
}());
