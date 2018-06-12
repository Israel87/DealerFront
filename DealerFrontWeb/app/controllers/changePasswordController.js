'use strict';

define(['app'], function (app) {

    var injectParams = ['$location', '$routeParams', 'authService','notificationService'];

    var changePasswordController = function ($location, $routeParams, authService, notificationService) {
        var vm = this,
            path = '/dashboard';

        if (!authService.user.isAuthenticated) {
            $location.path("/login");
            return;
        }

        vm.user = {
            ConfirmPassword: "",
            NewPassword: "",
            OldPassword: ""
        }
        vm.errorMessage = null;

        //logout on login page load

        vm.login = function () {
            authService.ChangePassword(vm.user).then(
                function (result) {
                    console.log(result)
                    if (result.statusText == "OK") {                           
                        notificationService.success('Success');
                        localStorage.setItem('isFirstLogin');
                        authService.user.isFirstLogin = false;
                        $location.path("/dashboard");
                    }
                },
                function (error) {
                    console.log(error)
                    notificationService.error(error.data != "" && error.data.Message != "" ? error.data.Message : "An error occured...try again!");
                }
                
            )}
        };
    

    changePasswordController.$inject = injectParams;

    app.register.controller('changepasswordController', changePasswordController);

});