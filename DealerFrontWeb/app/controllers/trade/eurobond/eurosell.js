angular
    .module('app')
    .controller('EuroSellController', EuroSellController);

EuroSellController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function EuroSellController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in FG Bonds"

};