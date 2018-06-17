'use strict';

//define(['app'], function (app) {

var app = angular.module('app');

    var injectParams = ['$http', '$q', 'authService'];

    var commonService = function ($http, $location, authService) {

        var serviceBase = authService.baseURL + 'user/';
        var factory = {};

        factory.AddUser = function (item) {
            if (!authService.isAuthenticated) {
                $location.url = "/login";
            }
            console.log(item)
            return $http.post(serviceBase + "/register", item);
        }

        factory.getGenderId = function (gender) {
            switch (gender) {
                case 'Male':
                    return '1';
                case 'Female':
                    return '2';
            }
        }

        factory.getGender = function (id) {
            switch (id) {
                case 1:
                    return 'Male';
                case 2:
                    return 'Female';
            }
        }

        factory.getTitleId = function (title) {
            switch (title) {
                case 'Mr':
                    return '1';
                case 'Mrs':
                    return '2';
                case 'Miss':
                    return '3';
                case 'Ms':
                    return '4';
                case 'Dr':
                    return '5';
                case 'Prof':
                    return '6';
            }
        }

        factory.getTitle = function (title) {
            switch (title) {
                case 1:
                    return '1';
                case 'Mrs':
                    return '2';
                case 'Miss':
                    return '3';
                case 'Ms':
                    return '4';
                case 'Dr':
                    return '5';
                case 'Prof':
                    return '6';
            }
        }

        return factory;
    }


    commonService.$inject = injectParams;

    app.factory('commonService', commonService);

//});