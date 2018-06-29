'use strict';

var app = angular.module('app');

var injectParams = ['$http', '$q', 'authService', 'baseUrl'];

var createTradeService = function ($http, $location, authService, baseUrl) {

    var serviceBase = baseUrl + 'TreasuryBills';
    var factory = {};


    factory.GetTBills = function(){
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + "/tbillstrades");
    }


    factory.CreateTrades = function (item) {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.post(serviceBase + "/create", item);
    }

    return factory;

}

createTradeService.$inject = injectParams;

app.factory('createTradeService', createTradeService);