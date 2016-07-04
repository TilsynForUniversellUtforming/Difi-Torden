(function () {
  'use strict';

  angular
    .module('indicators.services')
    .service('IndicatorsCreateService', IndicatorsCreateService);

  function IndicatorsCreateService() {
    var service = {
      details:{},
      views:{currentView:'main',main:'main'},
      goToView:goToView,
      backToMain:backToMain,
      setMainView:setMainView,
      resetMainView:resetMainView
    };

    return service;

    function goToView(name, item){
      service.views.currentView=name;
      if(item && item != null && item!= undefined){
        service.details = item;
      }
    }
    function backToMain(){
      goToView(service.views.main, null);
    }
    function setMainView(name){
      console.log("setting main view to " + name)
      service.views.main = name;
    }
    function resetMainView(){
      service.views.main = "main";
    }
  }
}());
