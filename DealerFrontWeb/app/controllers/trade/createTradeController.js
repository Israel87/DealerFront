angular
    .module('app')
    .controller('CreateTradeController', CreateTradeController);

CreateTradeController.$inject = ['$scope', 'authService', '$location', '$routeParams', 'tradeVolumeService', 'securityService', 'settlementbankService','createTradeService','pinesNotifications'];

function CreateTradeController($scope, authService, $location, $routeParams, tradeVolumeService, securityService, settlementbankService, createTradeService, pinesNotifications) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;

    vm.volume = {
        InitialVolume: "",
        InstrumentName: "",
        TradeDate: "",
        SettlementType: "",
        SettlementDate: "",
        Tenor: "",
        SettlementBankName: "",
        BankCharge: "",
        InstrumentType: ""
    };

    vm.selectedCounterPartyName = {};

    var clearTradeVolume = function () {
        vm.volume = {
            InitialVolume: "",
            InstrumentName: "",
            TradeDate: "",
            SettlementType: "",
            SettlementDate: "",
            Tenor: "",
            SettlementBankName: "",
            BankCharge: "",
            InstrumentType: ""
        };
    }

   
    vm.selectedBankName = {};
    vm.settlementType = ["0", "1", "2", "3", "4", "5", "6", "7"];




    // create trade 
    //...buy models

    vm.buytrade = {
        TradeVolumeId: "",
        BuyVolume: "",
        BuyRate: "",
        BuyCounterparty: "",
        BuyClientSettlementBank: "",
        TradeType: "",
        BuyApplyCharge: ""
    }

    vm.selectedCounterPartyName = {};
    // ...sell models 

    vm.selltrade = {
        TradeVolumeId: "",
        SellVolume: "",
        SellRate: "",
        SellCounterparty: "",
        SellClientSettlementBank: "",
        TradeType: "",
        SellApplyCharge: ""
    }

    // 
  

    // create buy trade function
    vm.createBuyTrade = function () {
        // check the status of apply charge.
        if (buyapplycharge.checked) {
            vm.buytrade.BuyApplyCharge = true;
        }
        else {
            vm.buytrade.BuyApplyCharge = false;
        }
        console.log(vm.buytrade.BuyApplyCharge);

        vm.buytrade.TradeType = "Buy";
        vm.buytrade.TradeVolumeId = vm.tradeVolumeId;
        vm.buytrade.BuyCounterparty = vm.selectedCounterPartyName.CounterPartyName;

       
        var payload = {
            TradeVolumeId: vm.buytrade.TradeVolumeId,
            Volume: vm.buytrade.BuyVolume,
            Rate: vm.buytrade.BuyRate,
            CounterParty: vm.buytrade.BuyCounterparty,
            TradeType: vm.buytrade.TradeType,
            ApplyCharge: vm.buytrade.BuyApplyCharge,
            CounterPartySettlementBank: vm.buytrade.BuyClientSettlementBank
        }

        console.log(payload);
        createTradeService.CreateTrades(payload).
            then(function (result) {
                console.log(result)

                if (result.statusText == "OK") {
                    pinesNotifications.notify({
                        title: 'Success',
                        type: 'success',
                        text: 'Buy trade successfully completed.'
                    });
                }
            },
                function (error) {
                    console.log(error)
                }
            );
    }


        // create sell trade function
    vm.createSellTrade = function () {
        // check the status of apply charge.
        if (sellapplycharge.checked) {
            vm.selltrade.SellApplyCharge = true;
        }
        else {
            vm.selltrade.SellApplyCharge = false;
        }
        console.log(vm.selltrade.SellApplyCharge);
        vm.selltrade.TradeType = "Sell";
        vm.selltrade.TradeVolumeId = vm.tradeVolumeId;
        vm.selltrade.SellCounterparty = vm.selectedCounterPartyName.CounterPartyName;


        var payload = {
            TradeVolumeId: vm.selltrade.TradeVolumeId,
            Volume: vm.selltrade.SellVolume,
            Rate: vm.selltrade.SellRate,
            CounterParty: vm.selltrade.SellCounterparty,
            TradeType: vm.selltrade.TradeType,
            ApplyCharge: vm.selltrade.SellApplyCharge,
            CounterPartySettlementBank: vm.selltrade.SellClientSettlementBank
        }

        console.log(payload);
        createTradeService.CreateTrades(payload).
            then(function (result) {
                console.log(result)

                if (result.statusText == "OK") {
                    pinesNotifications.notify({
                        title: 'Success',
                        type: 'success',
                        text: 'Sell trade successfully completed.'
                    });
                }
            },
                function (error) {
                    console.log(error)
                }
            );
    }

        // get the list of trades


        // determine the security type using switch case statement
        function getSecurityTypeId(str) {
            switch (str) {
                case 'Treasury Bills':
                    return 1;
                case 'FGN Bonds':
                    return 2;
                case 'Euro Bonds':
                    return 3;

                default: return 0;
            }
        }


        //vm.selectedInstrumentName = {};
        vm.InitCreateTradePage = function (type) {

            var typeId = getSecurityTypeId(type)
            //vm.returnedList = [vm.selectedList]
            securityService.GetSecurityByTypeId(typeId).then(
                function (result) {
                    console.log(result)
                    if (result.statusText == "OK") {
                        vm.securityList = result.data;
                        console.log(vm.securityList);
                    }
                },
                function (error) {
                    console.log(error);
                }
            );

            tradeVolumeService.GetVolumes()
                .then(function (result) {
                    console.log(result);
                    vm.gettradevolumes = result.data;

                });

            // get counterparties to display
            securityService.GetCounterparties()
                .then(function (result) {
                    console.log(result);
                    vm.getcounterparties = result.data;
                });

            // get settlementbanks to display.
            settlementbankService.GetSettlementBanks()
                .then(function (result) {
                    console.log(result);
                    vm.getsettlementbanks = result.data;
                });

            // get the list of settlement types
            vm.transactionType = ["0", "1", "2", "3", "4", "5", "6", "7"];

        }

        vm.volumeFigure;
        vm.tradeVolumeId;
        vm.securityName;
        // get the values
        vm.getVolumeValues = function (x, y, z) {
            console.log(x, y, z);
            vm.volumeFigure = x;
            vm.securityName = y;
            vm.tradeVolumeId = z;

        }


        // for setting the date
        vm.dateSelected = function () {
            var selectedDate = new Date(vm.TradeDate);
            if (selectedDate.getDay() === 0 || selectedDate.getDay() == 6) {
                pinesNotifications.notify({
                    title: 'Information',
                    type: 'failure',
                    text: "Saturdays/Sundays are not transaction days!"
                });

                //select next valid date
                while (selectedDate.getDay() === 0 || selectedDate.getDay() == 6) {
                    selectedDate.setDate(selectedDate.getDate() + 1);
                }

                vm.TradeDate = selectedDate;
                // vm.leaveRequest.NoOfDays = 0;

            }

            if (vm.SettlementType != null) {
                vm.changeSettlementDate();
            }
        }

        // on click function to change the date for settlement date.

        vm.changeSettlementDate = function () {
            if (vm.TradeDate == null || vm.SettlementType == null) {
                // perform task here.
                pinesNotifications.notify({
                    title: 'Information',
                    type: 'failure',
                    text: "Select a trade date and settlement type."
                });
                clearSetDate();

            }

            //set min , max AND end date input text
            //vm.minDate = moment(new Date()).format("YYYY-MM-DD")
            //vm.maxDate = moment(new Date(new Date().getFullYear(), 11, 31)).format("YYYY-MM-DD")


            //moment('4/30/2016', 'MM/DD/YYYY').add(1, 'day')
            //moment('01/12/2016', 'DD/MM/YYYY', true).format()

            var tradeDate = moment(vm.TradeDate, 'MM/DD/YYYY', true).format('LL');
            console.log(tradeDate);
            var settlementType = parseInt(vm.SettlementType);

            //var generateSettlementDate = moment(tradeDate).add(settlementType, 'day').format('LL');
            var generateSettlementDate = new Date(vm.TradeDate);
            if (settlementType != 0) {
                for (var i = 1; i <= settlementType; i++) {

                    generateSettlementDate.setDate(generateSettlementDate.getDate() + 1);
                    //select next valid date
                    while (generateSettlementDate.getDay() == 0 || generateSettlementDate.getDay() == 6) {
                        generateSettlementDate.setDate(generateSettlementDate.getDate() + 1);
                    }
                }
            }

            console.log(generateSettlementDate);
            generateSettlementDate = moment(generateSettlementDate).format('LL');
            vm.SettlementDate = generateSettlementDate;
        }


        // for the counterparty options for either default or client.
        vm.chooseCounterparty = function () {
            if (clCounter.checked) {
                defCounterparty.style.visibility = 'hidden';
                clCounterparty.style.visibility = 'visible';
                clCounterparty.value = "";
            } else if (!clCounter.checked) {
                defCounterparty.style.visibility = 'visible';
                clCounterparty.style.visibility = 'hidden';
                defCounterparty.value = "";

            }

        }

        vm.sellCounterpartyChoice = function () {
            if (sellclCounter.checked) {
                selldefCounterparty.style.visibility = 'hidden';
                sellclCounterparty.style.visibility = 'visible';
                sellclCounterparty.value = "";
            } else if (!sellclCounter.checked) {
                selldefCounterparty.style.visibility = 'visible';
                sellclCounterparty.style.visibility = 'hidden';
                selldefCounterparty.value = "";
            }
        }




        // save tradeVolume
        vm.saveTradeVolume = function () {           
            console.log(vm.volume);
            console.log(vm.InstrumentType);
            vm.volume.InstrumentName = vm.selectedInstrumentName.InstrumentName;
            vm.volume.SettlementBankName = vm.selectedBankName.BankName;
            vm.volume.SettlementDate = vm.SettlementDate;
            vm.volume.SettlementType = vm.SettlementType;
            vm.volume.BankCharge = vm.selectedBankName.BankCharge;
            vm.volume.InstrumentType = vm.selectedInstrumentName.InstrumentType.Name;
            vm.volume.TradeDate = vm.TradeDate;
            vm.volume.Tenor = vm.Tenor;

            tradeVolumeService.CreateVolume(vm.volume).then(
                function (result) {

                    console.log(result)
                    if (result.statusText == "OK") {
                        pinesNotifications.notify({
                            title: 'Success!',
                            type: 'success',
                            text: "Volume created successfully!"
                        });
                        clearTradeVolume();
                        //  vm.initSetupVolumePage();
                        //clearVolumeForm();
                    }
                },
                function (error) {
                    console.log(error)

                }
            );
        }

    }

