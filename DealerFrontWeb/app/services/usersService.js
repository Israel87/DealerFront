'use strict';

define(['app'], function (app) {

    var injectParams = ['$http', '$q', 'authService', 'baseUrl'];

    var usersFactory = function ($http, $location, authService, baseUrl) {
    
        var serviceBase = baseUrl + 'user/';
        var   factory = {};

        factory.AddUser = function (item) {
            if (!authService.isAuthenticated) {
                $location.url = "/login";
            }
           return $http.post(serviceBase + "/register", item);
        }

        factory.UpdateUser = function (item) {
            if (!authService.isAuthenticated) {
                $location.url = "/login";
            }
            console.log(item)
            return $http.post(serviceBase + "/update", item);
        }
        
        factory.GetUsers = function () {
            if (!authService.isAuthenticated) {
                $location.url = "/login";
            }
            return $http.get(serviceBase);
        }

        factory.GetUser = function (id) {
            if (!authService.isAuthenticated) {
                $location.url = "/login";
            }
            return $http.get(serviceBase + id);
        }


        factory.GetUserByEmail = function (id) {
            if (!authService.isAuthenticated) {
                $location.url = "/login";
            }
            return $http.get(serviceBase + "?id="+ id);
        }

        factory.EnableUser = function (id) {
            if (!authService.isAuthenticated) {
                $location.url = "/login";
            }
            return $http.get(serviceBase + "/enable/" + id);
        }

        factory.DisableUser = function (id) {
            if (!authService.isAuthenticated) {
                $location.url = "/login";
            }
            return $http.get(serviceBase + "/disable/" + id);
        }

       return factory;
    }


    usersFactory.$inject = injectParams;

    app.factory('usersService', usersFactory);

});