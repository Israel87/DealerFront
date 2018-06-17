angular
    .module('app')
    .controller('UserController', UserController);

UserController.$inject = ['$scope', 'authService', '$location', '$routeParams', 'usersService','commonService', 'pinesNotifications'];

function UserController($scope, authService, $location, $routeParams, usersService,commonService, pinesNotifications) {
    if (!authService.user.isAuthenticated) {
        $location.path("/login");
        return;
    }

    if (authService.user.isFirstLogin) {
            $location.path("/changepassword");
            return;
    }

    var vm = $scope

    vm.user = {
        FirstName: "",
        LastName: "",
        Gender: "",
        Email: "",
        PhoneNumber: "",
        Roles: ""
    };

    var clearUserForm = function () {
        vm.user = {
            FirstName: "",
            LastName: "",
            Gender: "",
            Email: "",
            PhoneNumber: "",
            Roles: ""
        };
        vm.selectedManager = {};
    }

    vm.usersList = [];

    vm.genderList = ["Male", "Female"];
    vm.roleList = ["Administrator", "User"];

    initPage();

    vm.saveUser = function () {
        
        vm.user.Gender = commonService.getGenderId(vm.user.Gender);
        console.log(vm.user)
        usersService.AddUser(vm.user).then(
            function (result) {
                alert('ETA : 8:15pm');
                console.log(result)
                if (result.statusText == "OK") {
                    pinesNotifications.notify({
                        title: 'Success!',
                        type: 'success',
                        text: "User created successfully!"
                    });
                    vm.addUserClicked = false;
                    initPage();
                }
            },
            function (error) {
                console.log(error)

            }
        );

    }

    function initPage() {
        clearUserForm();
        usersService.GetUsers().then(
            function (result) {
                console.log(result)
                if (result.statusText == "OK") {
                    vm.usersList = result.data;
                }
            },
            function (error) {
                console.log(error);
            }
        );

        //usersService.GetSettlementBanks().then(
        //    function (result) {
        //        console.log(result);
        //        if (result.statusText == "OK") {
        //            vm.settlementbanks = result.data;
        //        }
        //    },
        //    function (error) {
        //        console.log(error);
        //    }

        //);
    }

    vm.launchEditUser = function (id) {
        vm.editUserClicked = true;

        //get user
        usersService.GetUser(id).then(
            function (result) {
                vm.user = result.data;
                GetUserRoles(vm.user);
                GetDepartments(vm.user);
            },
            function (error) {
                console.log(error)

            }
        );
    }

    var GetUserRoles = function (user) {
        //get user roles
        authService.GetUserRoles(user.Id).then(
            function (result) {
                vm.user.Roles = result.data;
                GetManagerList(user);
                console.log(vm.user)
            },
            function (error) {
                console.log(error)

            }
        )
    }


    vm.updateUser = function () {
        vm.user.Gender = commonService.getGenderId(vm.user.Gender);
        //vm.user.ManagerId = vm.selectedManager != undefined ? vm.selectedManager.Id : "";
        //vm.user.DepartmentId = vm.selectedDepartment != undefined ? vm.selectedDepartment.Id : "";
        usersService.UpdateUser(vm.user).then(
            function (result) {
                console.log(result)
                if (result.statusText == "OK") {
                    notificationService.success('User Updated successfully!.');
                    vm.addUserClicked = false;
                    vm.editUserClicked = false;
                    initPage();
                }
            },
            function (error) {
                console.log(error)


                vm.addUserClicked = false;
                vm.editUserClicked = false;
                initPage();
            }
        );

    }

    vm.enableUser = function (id) {
        usersService.EnableUser(id).then(
            function (result) {
                console.log(result)
                if (result.statusText == "OK") {
                    notificationService.success('User Enabled successfully!.');

                    initPage();
                }
            },
            function (error) {
                console.log(error)


            }
        );

    }

    vm.disableUser = function (id) {
        usersService.DisableUser(id).then(
            function (result) {
                console.log(result)
                if (result.statusText == "OK") {
                    notificationService.success('User Disabled successfully!.');

                    initPage();
                }
            },
            function (error) {
                console.log(error)


            }
        );

    }

};