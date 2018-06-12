angular
    .module('app')
    .controller('CurrencyController', CurrencyController);


CurrencyController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function CurrencyController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in Currency"

};