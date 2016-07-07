(function () {
  'use strict';

  angular
    .module('indicators')
    .controller('IndicatorsListController', IndicatorsListController);

  IndicatorsListController.$inject = ['IndicatorsService'];

  function IndicatorsListController(IndicatorsService) {
    var vm = this;

    // vm.indicators = IndicatorsService.query();
    vm.indicators = [{
        _id: "100",
        title:"test 1 ",
        description: "test 1 desc",
        activities: [
        {
            title: "test 1 act 1",
            description : "test 1 act 1 desc",
            inputs: [{
                text: "test 1 act 1 input 1",
                type:"yesno",
            },{
                text: "another test 1 act1 input 2",
                type:"freetext"
            }]
        },
        {
            title: "test 1 act 2",
            description : "test 1 act 2 desc",
            inputs: [{
                text: "test 1 act 2 input 1",
                type:"yesno",
            },{
                text: "another test 1 act 2 input 2",
                type:"freetext"
            }]
        }
        ]
    },
    {
        _id: "101",
        title:"test 2 ",
        description: "test 2 desc",
        activities: [
        {
            title: "test 2 act 1",
            description : "test 2 act 1 desc",
            inputs: [{
                text: "test 2 act 1 input 1",
                type:"yesno",
            },{
                text: "another test 2 act1 input 2",
                type:"freetext"
            }]
        },
        {
            title: "test 2 act 2",
            description : "test 2 act 2 desc",
            inputs: [{
                text: "test 2 act 2 input 1",
                type:"yesno",
            },{
                text: "another test 2 act 2 input 2",
                type:"freetext"
            }]
        }
        ]
    }]
  }
}());
