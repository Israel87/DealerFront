angular
    .module('app')
    .controller('EuroVolumeController', EuroVolumeController);

EuroVolumeController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function EuroVolumeController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in Euro Bonds"

};