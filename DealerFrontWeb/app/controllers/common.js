'use strict';

 angular.module('app')
    .controller('NavbarController', NavbarController);


NavbarController.$inject = ['$scope', '$location', 'config', '$q', 'baseUrl', '$http', 'authService', '$window', 'pinesNotifications'];;


function NavbarController ($scope, $location, config, $q, baseUrl, $http, authService, $window, pinesNotifications) {

    var vm = $scope;

    vm.isCollapsed = false;
    vm.isAdmin = false;

    vm.highlight = function (path) {
        console.log($location.path().substr(0, path.length))
        return $location.path().substr(0, path.length) === path;
    };

    vm.user = {
        Email: "",
        isLoggedIn: false
    }
   
    vm.initPage = function () {
        if (localStorage.getItem("AuthorizationData")) {
            var authDataString = localStorage.getItem("AuthorizationData");
            var authData = JSON.parse(authDataString)

            authService.LogUserIn(authData)

            if (localStorage.getItem('isFirstLogin')) {
                authService.user.isFirstLogin = localStorage.getItem('isFirstLogin') == "True";
            }
            else
                authService.user.isFirstLogin = false;
        } else {
            redirectToLogin();
        }
    }
    
    function redirectToLogin() {
        localStorage.setItem("activeTab_mainmenu", 1)
        $location.path("/login");
    }

    function getLoggedInUser() {
        $http.get(baseUrl + "/user/loggedin").success(function (result) {
            console.log(result);

            authService.user.firstname = result.loggedInUser.FirstName
            authService.user.lastname = result.loggedInUser.LastName;
            authService.user.lastlogin = result.lastLogin;

        }).error(function (errorResponse) {
            factory.logout();
        });

    };//End LoginData Function


    $scope.$on('redirectToLogin', function () {
        localStorage.setItem("activeTab_mainmenu", 1)
        $location.path("/login");
    });

    $scope.$on('logged_in', function (model, obj) {
        vm.user.Email = obj.username;
        vm.user.isLoggedIn = true;
        vm.UserRoles = authService.user.roles;
        vm.isAdmin = vm.UserRoles.indexOf("Super Administrator") > -1;
        //var activeTab = localStorage.getItem("activeTab_mainmenu");
        //activeTab = activeTab != undefined || activeTab != null || activeTab != "" ? activeTab : 1;
        //vm.setActiveTab(activeTab);
        // getLoggedInUser();

    });

    $scope.$on('loggedOut', function () {
        vm.user.Email = "";
        vm.user.isLoggedIn = false;
        localStorage.setItem("activeTab_mainmenu", 1);
    });

    $scope.$on('error', function (res, obj) {
        console.log(obj)

        if (obj.data == null) {

            pinesNotifications.notify({
                title: 'Oopz!',
                type: 'error',
                text: "Server is temporarily down..Try again later"
            });
        }
        else if (obj.status == 409) {

        }
        else {
            var err = "";

            if (obj.data.Message != undefined && obj.data.Message != "")
                err = obj.data.Message

            else if (obj.data.error_description != undefined && obj.data.error_description != "")
                err = obj.data.error_description

            if (obj.data.ModelState != undefined) {
                var values = Object.values(obj.data.ModelState);
                err += " " + values.join()

            }

            pinesNotifications.notify({
                title: 'Error!',
                type: 'error',
                text: err || obj.statusText || "An error occured..Try again"
            });
        }



        //$location.url('/error?status=' + (obj.statusText || "Error!") + '&message=' + ());
    });

    $scope.$on('IdleStart', function () {
        // alert("You've been idle for 10secs!")
    });

    $scope.$on('IdleEnd', function () {
        //alert("Oppz!")
    });

    $scope.$on('IdleTimeout', function () {
        localStorage.setItem("activeTab_mainmenu", 1);
        $window.location.href = "/login";
        alert("You've been logged out!");

    });

    //function setLoginLogoutText() {
    //    vm.loginLogoutText = (authService.user.isAuthenticated) ? 'Logout' : 'Login';
    //}

    //setLoginLogoutText();

};

