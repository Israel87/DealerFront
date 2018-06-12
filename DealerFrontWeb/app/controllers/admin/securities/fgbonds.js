angular
    .module('app')
    .controller('FGBondController', FGBondController);


FGBondController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function FGBondController($scope, authService, $location, $routeParams) {
    
    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in FG Bonds"

};