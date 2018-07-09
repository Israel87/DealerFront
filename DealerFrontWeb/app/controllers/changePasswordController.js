angular
    .module('app')
    .controller('ChangePasswordController', ChangePasswordController);
ChangePasswordController.$inject = ['$scope', 'authService', '$location', '$routeParams', 'pinesNotifications'];

function ChangePasswordController($scope, authService, $location, $routeParams, pinesNotifications) {

    var vm = $scope;

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
                        pinesNotifications.notify({
                            title: 'Success!',
                            type: 'success',
                            text: "Password changed successfully!"
                        });
                        localStorage.setItem('isFirstLogin');
                        authService.user.isFirstLogin = false;
                        $location.path("/dashboard");
                    }
                },
                function (error) {
                    console.log(error);
                    pinesNotifications.notify({
                        title: 'Error Occured!',
                        type: 'error',
                        text: "...please check your password and try again!"
                    });
                    //notificationService.error(error.data != "" && error.data.Message != "" ? error.data.Message : "An error occured...try again!");
                }
                
            )}
        };
    


