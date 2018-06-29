angular
    .module('app')
    .controller('SettlementBankController', SettlementBankController);

SettlementBankController.$inject = ['$scope', 'authService', '$location', '$routeParams', 'settlementbankService', 'pinesNotifications'];

function SettlementBankController($scope, authService, $location, $routeParams, settlementbankService,  pinesNotifications) {
    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    //if (authService.user.isFirstLogin) {
    //    $location.path("/changepassword");
    //    return;
    //}

    var vm = $scope

    vm.settlementbank = {
        BankName: "",
        BankCharge: ""
    };

    vm.clearSettlementBankForm = function () {
        vm.settlementbank = {
            BankName: "",
            BankCharge: ""
        };

    };

    vm.saveSettlementBanks = function () {
        console.log(vm.settlementbank)
        settlementbankService.AddSettlementBanks(vm.settlementbank).then(
            function (result) {
                alert('ETA : 8:15pm');
                console.log(result)
                if (result.statusText == "OK") {
                    pinesNotifications.notify({
                        title: 'Success!',
                        type: 'success',
                        text: "Settlement Bank created successfully!"
                    });
                    vm.initPage();
                    vm.clearSettlementBankForm();
                }
            },
            function (error) {
                console.log(error)

            }
        );

    }


    vm.initPage = function() {
        settlementbankService.GetSettlementBanks().then(
            function (result) {
                console.log(result);
                if (result.statusText == "OK") {
                    vm.settlementbanks = result.data;
                }
            },
            function (error) {
                console.log(error);
            }

        );
    }

    

}