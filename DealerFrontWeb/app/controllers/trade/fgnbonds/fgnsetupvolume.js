angular
    .module('app')
    .controller('FGNVolumeController', FGNVolumeController);


FGNVolumeController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function FGNVolumeController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in FG Bonds Setup Volume"

};