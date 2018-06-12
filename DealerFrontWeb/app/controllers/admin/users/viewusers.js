angular
    .module('app')
    .controller('ViewUserController', ViewUserController);


ViewUserController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function ViewUserController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in View Users"

};