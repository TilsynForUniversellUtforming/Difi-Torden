(function()
{
    'use strict';

    angular
        .module('indicators.services')
        .factory('InputsService', InputsService);

    InputsService.$inject = ['$resource'];

    function InputsService($resource)
    {
        return $resource('api/inputs/:inputId',
        {
            inputId: '@_id'
        },
        {
            update:
            {
                method: 'PUT'
            }
        });
    }
}());