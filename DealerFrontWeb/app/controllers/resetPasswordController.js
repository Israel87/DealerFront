'use strict';

define(['app'], function (app) {

    var injectParams = ['$location','$window', 'authService', 'notificationService'];

    var ResetPasswordController = function ($location,$window, authService, notificationService) {

        var vm = this;

        vm.user = "";
        vm.errorMessage = null;
        vm.backToLogin = false;
     
        vm.resetPassword = function () {
            authService.ResetPassword(vm.user).then(
                function (result) {
                    console.log(result)
                    if (result.statusText == "OK") {
                        notificationService.success('Success. A mail has been sent to you');

                        authService.user.isFirstLogin = false;
                        vm.backToLogin = true;
                        //$location.path('/login');
                    }
                },
                function (error) {
                    console.log(error)
                    //notificationService.error(error.data != "" && error.data.Message != "" ? error.data.Message : "An error occured...try again!");
                }

            )
        }

        vm.goToLogin = function (email) {
            $window.location = '?email=' + email;
        }
    };

    ResetPasswordController.$inject = injectParams;

    app.register.controller('ResetPasswordController', ResetPasswordController);

});