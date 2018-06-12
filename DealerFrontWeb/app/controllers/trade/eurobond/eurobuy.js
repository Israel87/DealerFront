angular
    .module('app')
    .controller('EuroBuyController', EuroBuyController);

EuroBuyController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function EuroBuyController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in FG Bonds"

};