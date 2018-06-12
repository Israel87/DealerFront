'use strict';

var app = angular.module('app');

app.config(['$httpProvider', function ($httpProvider) {

    var injectParams = ['$q', '$rootScope'];

    var httpInterceptor401 = function ($q, $rootScope) {

        var success = function (response) {
            return response;
        };

        var error = function (res) {
            if (res.status === 403) {
                //Raise event so listener (navbarController) can act on it
                $rootScope.$broadcast('redirectToLogin', null);
                return $q.reject(res);
            }
            else if (res.status !== 200) {
                //Raise event so listener (navbarController) can act on it
                $rootScope.$broadcast('error', res);
                return $q.reject(res);
            }
            return $q.reject(res);
        };

        return {
            request: function (config) {
                config.headers = config.headers || {};
                var authDataString = localStorage.getItem("AuthorizationData");
                var authData = JSON.parse(authDataString)
                if (authData) {
                    config.headers.Authorization = "Bearer " + authData.token;
                }
                return config;
            },
            requestError: function (rejection) {
                return error(rejection);
            },
            response: function (response) {
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                return error(rejection);
            }
        };

    };

    httpInterceptor401.$inject = injectParams;

    $httpProvider.interceptors.push(httpInterceptor401);

}]);
