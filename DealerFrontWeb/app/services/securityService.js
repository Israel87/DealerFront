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

    factory.GetSecurityByTypeId = function (id) {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + "/" + id);
    }

    factory.GetSecurityByType = function (id) {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + "/all");
    }

    // create and get CounterParty.
    factory.CreateCounterParty = function (item) {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.post(serviceBase + "/createCounterparty", item);
    }

    factory.GetCounterparties = function () {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + "/counterParties");
    }

    // create and get Currencies.
    factory.AddCurrency = function (item) {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.post(serviceBase + "/addcurrency", item);
    }

    factory.GetCurrencies = function () {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + "/currencies");
    }

    return factory;
}


securityService.$inject = injectParams;

app.factory('securityService', securityService);