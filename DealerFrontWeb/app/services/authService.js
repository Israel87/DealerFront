'use strict';

var app = angular.module('app');

var injectParams = ['$http', '$location', '$rootScope', 'baseUrl', '$q', 'accessTokenUrl','pinesNotifications'];

var authFactory = function ($http, $location, $rootScope, baseUrl, $q, accessTokenUrl, pinesNotifications) {
    var serviceBase = baseUrl + 'account/',
        factory = {
            loginPath: '/login',
            user: {
                isAuthenticated: false,
                roles: null,
                username: "",
                isFirstLogin: false,
            }
        };

    factory.isAuthenticated = factory.user.isAuthenticated;

    factory.logout = function () {
        var authDataRemoved = localStorage.removeItem("AuthorizationData");
        factory.user.isAuthenticated = false;
        factory.user.username = "";
        factory.user.roles = [];

        $rootScope.$broadcast('loggedOut', null);
    };

    factory.login = function (email, pwd) {
        var data = "grant_type=password&username=" + email + "&password=" + pwd;
        var deferred = $q.defer();
        $http.post(accessTokenUrl,
            data,
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            })
            .then(function (success) {
                console.log(success)
                //this is called if authentication succeedes and return a response containing access token.
                // we simplify save the authentication token that will be used for future request to our localstorage
                var response = success.data
                var model = {
                    token: response.access_token,
                    username: email,
                    roles: response.roles.split(";"),
                    refreshCount: 0,
                    isFirstLogin: response.isFirstLogin
                };
                localStorage.setItem("AuthorizationData", JSON.stringify(model));
                setTokenDefault(model);

                deferred.resolve(response);
            })
            .catch(function (error) {
                console.log(error)
                factory.logout();               
                deferred.reject(error);
            });

        return deferred.promise;
    };//End LoginData Function

    function setTokenDefault(model) {
        console.log("set default token here")

        factory.user.isAuthenticated = true;
        factory.user.username = model.username;
        factory.user.roles = model.roles;
        factory.user.isFirstLogin = model.isFirstLogin == "True";
        console.log(factory.user)
        //save firstLoginStatus to local storage
        localStorage.setItem('isFirstLogin', model.isFirstLogin)
        $rootScope.$broadcast('logged_in', { username: model.username });
    }


    factory.setToken = function (model) {
        console.log(model)
        var accessTokenObject = {
            token: model.token,
            username: model.username,
            roles: model.roles.split(';'),
            refreshCount: 0
        }
        localStorage.setItem("AuthorizationData", JSON.stringify(accessTokenObject));
        factory.user.isAuthenticated = true;
        factory.user.username = model.username;
        factory.user.roles = model.roles.split(';');
    };//End LoginData Function

    factory.redirectToLogin = function () {
        //$rootScope.$broadcast('redirectToLogin', null);
    };

    factory.GetUserRoles = function (id) {
        if (!factory.user.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + 'roles/' + id);
    }

    factory.ChangePassword = function (payload) {
        if (!factory.user.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.post(serviceBase + 'changepassword', payload);
    }


    factory.ResetPassword = function (payload) {
        if (!factory.user.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.post(serviceBase + 'forgotpassword/' + payload + '/reset');
    }

    factory.GetUsersInRole = function (role) {
        if (!factory.user.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + "userinrole/" + role);
    }

    factory.LogUserIn = function (response) {
        console.log("got here in auth service")
        setTokenDefault(response)
    }



    return factory;
};

authFactory.$inject = injectParams;

app.factory('authService', authFactory);
