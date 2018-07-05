angular
    .module('app')
    .controller('VolumeController', VolumeController);

VolumeController.$inject = ['$scope', 'authService', '$location', '$routeParams', 'tradeVolumeService', 'securityService','pinesNotifications'];

function VolumeController($scope, authService, $location, $routeParams, tradeVolumeService, securityService, pinesNotifications) {

    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    var vm = $scope;
    //vm.InstrumentType = 1,
        

    vm.selectedInstrumentName = {};
    

    

    var clearVolumeForm = function () {
        vm.volume = {
            InstrumentName: "",
            InitialVolume: ""
        };
    }

    function getSecurityTypeId(str) {
        switch (str) {
            case 'Treasury Bills':
                return 1;
            case 'FGN Bonds':
                return 2;

            default: return 0;
        }
    }

    // initialize page with the available instrument list.
    vm.initSetupVolumePage = function(type) {
        console.log('got here now')
        var typeId = getSecurityTypeId(type)
      //vm.returnedList = [vm.selectedList]
        securityService.GetSecurityByTypeId(typeId).then(          
            function (result) {
                console.log(result)
                if (result.statusText === "OK") {
                    vm.securityList = result.data;
                    console.log(vm.securityList);
                    //var lists = result.data.length;
                    //console.log(result.data.length)
                    //for (var i = 0; i < lists; i++) {
                    //    vm.selectedList = JSON.stringify(vm.securityList[i]["InstrumentName"]);
                    //    console.log(vm.selectedList);
                    //}
                }
            },
            function (error) {
                console.log(error);
            }
        );


        // Display initial trade volumes to display.
        tradeVolumeService.GetVolumes()
            .then(function (result) {
                console.log(result);
                vm.gettradevolumes = result.data;
            });

    }

    // get the volume values for summary modal
    vm.InitVolume;
    vm.InstrName;
    vm.SetlBankChg;
    vm.SetlBankName;
    vm.SetlType;
    vm.Tenor;
    vm.TotalCashFlow;
    vm.TotalCashFlowFMDQ;
    vm.TotalCharge;
    vm.VolumeBought;
    vm.VolumeSold;
    vm.tradedate;
    vm.settlementdate;


    vm.getSummaryValues = function (a,b,c,d,e,f,g,h,i,j,k, l,m) {
        vm.InitVolume = a;
        console.log(vm.InitVolume);
        vm.InstrName = b;
        vm.SetlBankChg = c;
        vm.SetlBankName = d;
        vm.SetlType = e;
        vm.Tenor = f;
        vm.TotalCashFlow = g;
        vm.TotalCashFlowFMDQ = h;
        vm.TotalCharge = i;
        vm.VolumeBought = j;
        vm.VolumeSold = k;
        vm.tradedate = l;
        vm.settlementdate = m;


    }
    // Set trade volume.
    vm.saveTradeVolume = function () {
        console.log(vm.volume);
        console.log(vm.InstrumentType);
        vm.volume.InstrumentName = vm.selectedInstrumentName.InstrumentName;

        tradeVolumeService.CreateVolume(vm.volume).then(
            function (result) {
                
                console.log(result)
                if (result.statusText === "OK") {
                    pinesNotifications.notify({
                        title: 'Success!',
                        type: 'success',
                        text: "Volume created successfully!"
                    });
                    vm.initSetupVolumePage();
                    clearVolumeForm();
                }
            },
            function (error) {
                console.log(error)

            }
        );
    }

}