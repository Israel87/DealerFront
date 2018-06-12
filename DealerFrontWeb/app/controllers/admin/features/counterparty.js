angular
    .module('app')
    .controller('CounterPartyController', CounterPartyController);


CounterPartyController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function CounterPartyController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in Counterparty"

};