(function()
{
    'use strict';

    angular
        .module('indicators.services')
        .service('ReqsTempService', ReqsTempService);

    ReqsTempService.$inject = ['$resource'];

    function ReqsTempService($resource)
    {
        return $resource('api/requirements/:requirementId',
        {
            requirementId: '@_id'
        },
        {
            update:
            {
                method: 'PUT'
            }
        });
    }
}());