'use strict';

var app = angular.module('app');

var injectParams = ['$http', '$q', 'authService', 'baseUrl'];

var securityService = function ($http, $location, authService, baseUrl) {

    var serviceBase = baseUrl + 'security/';
    var factory = {};

    factory.GetInstrumentTypes = function () {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + "/instrumenttypes");
    }  

    factory.CreateSecurity = function (item) {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.post(serviceBase + "/create", item);
    }  

    factory.GetAllSecurities = function () {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + "/all");
    }  

    return factory;
}


securityService.$inject = injectParams;

app.factory('securityService', securityService);