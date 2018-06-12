angular
    .module('app')
    .controller('EUROBondController', EUROBondController);


EUROBondController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function EUROBondController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in Euro Bonds"

};