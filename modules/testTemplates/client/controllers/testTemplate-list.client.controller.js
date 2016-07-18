(function () {
  'use strict';

  angular
    .module('testTemplates')
    .controller('TestTemplatesListController', TestTemplatesListController);

  TestTemplatesListController.$inject = ['TestTemplatesService'];

  function TestTemplatesListController(TestTemplatesService) {
    var vm = this;

     vm.testTemplates = TestTemplatesService.query();
   
  }
}());
