'use strict';

define(['app'], function (app) {

    var injectParams = ['$location', 'authService', '$routeParams', '$window'];

    var ErrorController = function ($location, authService, $routeParams, $window) {
        var vm = this;

        vm.errorStatus = $routeParams.status || 'Status';
        vm.errorMessage = $routeParams.message || 'Error message';

        vm.goBack = function () {
            $location.path('dashboard');
        }
        
    };

    ErrorController.$inject = injectParams;

    app.register.controller('ErrorController', ErrorController);

});