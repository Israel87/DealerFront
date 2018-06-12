angular
    .module('app')
    .controller('TbillsSellController', TbillsSellController);


TbillsSellController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function TbillsSellController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in FG Bonds Setup Volume"

};