(function () {
  'use strict';

  angular
    .module('testObjects')
    .controller('TestObjectsListController', TestObjectsListController);

  TestObjectsListController.$inject = ['TestObjectsService'];

  function TestObjectsListController(TestObjectsService) {
    var vm = this;

     vm.testObjects = TestObjectsService.query();
   
  }
}());
