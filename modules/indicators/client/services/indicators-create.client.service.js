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
            save:save,
            backupSet:backupSet,
            backupGet:backupGet,
            backupRevert:backupRevert,
            backupCompare:backupCompare
        };

        return service;

        var indicator = getBlankIndicator();
        var indicatorOld = null;
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
        //TODO Remove those
        function backupSet(ind){
            indicatorOld = angular.copy(ind ? ind : service.indicator);
        }
        function backupGet(){
            console.log("OLD:")
            console.log(indicatorOld);
            console.log("NEW:")
            console.log(service.indicator);
            return indicatorOld;
        }
        function backupRevert(){
            service.indicator = angualr.copy(indicatorOld);
        }
        function backupCompare(){
            return angular.equals(service.indicator, indicatorOld);
        }
    }
}());