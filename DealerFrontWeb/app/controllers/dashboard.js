angular
    .module('app')
    .controller('DashboardController', DashboardController);


DashboardController.$inject = ['$scope', 'authService','$location', '$routeParams'];

function DashboardController($scope, authService, $location, $routeParams) {
    
    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in Dashboard"

};