/*global angular*/

angular.module('skycanopy').factory('ajaxInterceptor', function ($q) {
	'use strict';

	var interceptor = {
        'request': function (config) {
            //console.log('request');
            return config;
        },
        'requestError': function (rejection) {
            //console.log('requestError')
            return $q.reject(rejection);
        },
        'response': function (response) {
            //console.log('response')

            if (response.data.success === false) {
                return $q.reject(response);
            }
            
            return response;
		},
        'responseError': function (rejection) {
            //console.log('responseError')	
            
            return $q.reject(rejection);
        }
    };

    return interceptor;
});