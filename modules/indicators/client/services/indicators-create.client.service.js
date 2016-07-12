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
            getBlankIndicator:getBlankIndicator

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

    }
}());