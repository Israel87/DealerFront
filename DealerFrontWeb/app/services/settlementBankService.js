'use strict';

//define(['app'], function (app) {
var app = angular.module('app');

var injectParams = ['$http', '$q', 'authService', 'baseUrl'];

var settlementbankService = function ($http, $location, authService, baseUrl) {
    var serviceBase = baseUrl + 'SettlementBanks';
    var factory = {};


// Add and Get SettlementBanks
factory.AddSettlementBanks = function (item) {
    if (!authService.isAuthenticated) {
        $location.url = "/login";
    }
    return $http.post(serviceBase + "/create", item);

}

factory.GetSettlementBanks = function () {
    if (!authService.isAuthenticated) {
        $location.url = "/login";
    }
    return $http.get(serviceBase + "/all");
}

return factory;

}


settlementbankService.$inject = injectParams;

app.factory('settlementbankService', settlementbankService);