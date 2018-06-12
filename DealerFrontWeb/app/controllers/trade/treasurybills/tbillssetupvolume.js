angular
    .module('app')
    .controller('TbillsVolumeController', TbillsVolumeController);


TbillsVolumeController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function TbillsVolumeController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in FG Bonds Setup Volume"

};