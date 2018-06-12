angular
    .module('app')
    .controller('TbillsBuyController', TbillsBuyController);


TbillsBuyController.$inject = ['$scope', 'authService', '$location', '$routeParams'];

function TbillsBuyController($scope, authService, $location, $routeParams) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    vm.message = "Here in FG Bonds Setup Volume"

};