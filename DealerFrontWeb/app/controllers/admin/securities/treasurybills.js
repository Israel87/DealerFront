angular
    .module('app')
    .controller('TreasuryBillsController', TreasuryBillsController);


TreasuryBillsController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function TreasuryBillsController($scope, authService, $location, $routeParams) {
    
    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in Treasury Bills"

};