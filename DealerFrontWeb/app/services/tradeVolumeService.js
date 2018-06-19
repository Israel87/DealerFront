'use strict';

var app = angular.module('app');

var injectParams = ['$http', '$q', 'authService', 'baseUrl'];


var tradeVolumeService = function ($http, $location, authService, baseUrl) {
    var serviceBase = baseUrl + 'tradeVolume';
    var factory = {};

    factory.CreateVolume = function (item) {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.post(serviceBase + "/create", item);
    }

    factory.GetVolumes = function (id) {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + "/volumes")
    }

    return factory;
}

tradeVolumeService.$inject = injectParams;
app.factory('tradeVolumeService', tradeVolumeService);