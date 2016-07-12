(function () {
  'use strict';

  angular
    .module('requirements')
    .controller('RequirementsListController', RequirementsListController);

  RequirementsListController.$inject = ['RequirementsService', '$window', '$state'];

  function RequirementsListController(RequirementsService, $window, $state) {
    var vm = this;

    vm.requirements = RequirementsService.query();
    vm.remove = remove;

    function remove(req)
        {
            if ($window.confirm('Are you sure you want to delete?'))
            {
            	RequirementsService.remove({requirementId:req._id}, function(){
            		 $state.reload('requirements.list');
            	})
               
            }
        }
  }
}());
