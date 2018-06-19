angular
    .module('app')
    .controller('SecurityController', SecurityController);


SecurityController.$inject = ['$scope', 'authService', '$location', '$routeParams', 'securityService', 'pinesNotifications'];

function SecurityController($scope, authService, $location, $routeParams, securityService, pinesNotifications ) {
    
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

    // counterparty controller variables
    vm.counterPartyModel = {
        CounterPartyName : ''
    }

    // currency controller variables
    vm.currencyModel = {
        CurrencyName : ''
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

        // get the list of securities available
        securityService.GetAllSecurities()
            .then(function(result) {
                console.log(result);
                vm.getsecurities = result.data;             
            });

        // get the list of counterparties available.
        securityService.GetCounterparties()
            .then(function(result) {
                console.log(result);
                vm.counterparties = result.data;
            })
            .catch(function(error) {
                console.log(error);
            });

        // get the list of currencies available.
        securityService.GetCurrencies()
            .then(function(result) {
                vm.currencies = result.data;
            })
            .catch(function(error) {
                console.log(error);
            })
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

    // Create counterparty
    vm.createCounterParty = function () {
        //alert('ETA : 7:00pm');
        securityService.CreateCounterParty(vm.counterPartyModel)
            .then(function (result) {
                //alert('ETA : Now');

                pinesNotifications.notify({
                    title: 'Success!',
                    type: 'success',
                    text: "CounterParty created successfully!"
                });
                clearCounterParty();

            })
            .catch(function(error) {
                console.log(error)
            });
    }

    // create currency
    vm.addCurrency = function () {
        alert('ETA : 8:15pm');
        securityService.AddCurrency(vm.currencyModel)
            .then(function (result) {
                alert('ETA : gba gbe oshi !!!');
                pinesNotifications.notify({
                    title: 'Success!',
                    type: 'success',
                    text: "Currency created successfully!"
                });
                clearCurrency();


            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // clear function for create security field.
    function clearCreateSecurityForm() {
        vm.securityModel = {
            InstrumentName: '',
            InstrumentType: {}
        }
    }

    // clear function for counterparty field.
    function clearCounterParty() {
        vm.counterPartyModel = {
            CounterPartyName : ''
        }
    }
    // clear function for currency field
    function clearCurrency() {
        vm.currencyModel = {
            CurrencyName: ''
        }
    }

};