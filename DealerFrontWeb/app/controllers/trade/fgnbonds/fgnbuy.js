angular
    .module('app')
    .controller('FGNBuyController', FGNBuyController);


FGNBuyController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function FGNBuyController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in FG Bonds Buy"

};