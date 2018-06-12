angular
    .module('app')
    .controller('FGNSellController', FGNSellController);


FGNSellController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function FGNSellController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in FG Bonds Buy"

};