angular
    .module('app')
    .controller('SecurityController', SecurityController);


SecurityController.$inject = ['$scope', 'authService', '$location', '$routeParams', 'securityService','pinesNotifications'];

function SecurityController($scope, authService, $location, $routeParams, securityService,pinesNotifications ) {
    
    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;

    //controller variables
    vm.instrumentTypes = {}
    vm.securityModel = {
        InstrumentName : '',
        InstrumentType: {}
    }

    //controller methods
    vm.initPage = function () {
        //populate instrumenttypes dropdown
        securityService.GetInstrumentTypes()
            .then(function (result) {

                vm.instrumentTypes = result.data;
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    vm.createSecurity = function () {

        securityService.CreateSecurity(vm.securityModel)
            .then(function (result) {

                pinesNotifications.notify({
                    title: 'Success!',
                    type: 'success',
                    text: "Security created successfully!"
                });
                clearCreateSecurityForm();
            })
            .catch(function (error) {
                console.log(error)
            });
    }



    //controller functions
    function clearCreateSecurityForm() {
        vm.securityModel = {
            InstrumentName: '',
            InstrumentType: {}
        }
    }

};