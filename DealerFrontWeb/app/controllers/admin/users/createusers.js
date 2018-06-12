angular
    .module('app')
    .controller('CreateUserController', CreateUserController);


CreateUserController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function CreateUserController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in Creating users"

};