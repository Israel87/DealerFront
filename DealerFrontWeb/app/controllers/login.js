angular
    .module('app')
    .controller('LoginController', LoginController);


LoginController.$inject = ['$scope', 'authService','$location', '$routeParams'];

function LoginController($scope, authService, $location, $routeParams) {
    var vm = $scope,
        path = '/dashboard';
    vm.email = null;
    vm.password = null;
    vm.errorMessage = null;

    //logout on login page load
    authService.logout();
    vm.logOut = function () {
        authService.logout();
    }

    vm.initPage = function () {
        vm.email = $routeParams.email;
    }

    vm.login = function () {
        console.log(vm.email)
        authService.login(vm.email, vm.password).then(function (status) {
            
            //if (authService.user.isFirstLogin == true) {
            //    $location.path("/changepassword");
            //    return;
            //}
            
            if (status && $routeParams && $routeParams.redirect) {
                path = path + $routeParams.redirect;
            }
            
            $location.path(path);
        })
        .catch(function (error) {
            //console.log(error)
        });
    };
};