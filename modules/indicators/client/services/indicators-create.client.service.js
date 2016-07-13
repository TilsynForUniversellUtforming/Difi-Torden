(function()
{
    'use strict';

    angular
        .module('indicators.services')
        .service('IndicatorsCreateService', IndicatorsCreateService);

    function IndicatorsCreateService()
    {
        var service = {
            indicator: indicator,
            getBlankIndicator:getBlankIndicator,
            save:save

        };

        return service;

        var indicator = getBlankIndicator();

        function getBlankIndicator(){
            return {
                title:'Indikator Uten titel',
                description:'',
                created_by:null,
                created_at:null,
                activities:[],
                requirements:[],
                routes:[]
            }
        }
        function save(successCallback, errorCallback){
            console.log("SERVICE: working with: ")
            console.log(service.indicator)
            if (service.indicator._id)
            {
                console.log("updating indicator")
                service.indicator.$update(successCallback, errorCallback);
            }
            else
            {
                console.log("creating new indicator")
                service.indicator.$save(successCallback, errorCallback);
            }
        }

    }
}());