'use strict';

var app = angular.module('app');

var injectParams = ['$http', '$q', 'authService', 'baseUrl'];

var createTradeService = function ($http, $location, authService, baseUrl) {

    var serviceBase = baseUrl + 'TreasuryBills';
    var factory = {};


    factory.GetTBills = function(){
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + "/tbillstrades");
    }

    // get the list of trades by Type.
    factory.GetTBillsByType = function (id) {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + "/tbillstrades");
    }

    factory.ExportToExcel = function () {
        var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function (s) { return $window.btoa(unescape(encodeURIComponent(s))); },
            format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) };
        return {
            tableToExcel: function (tableId, worksheetName) {
                var table = $(tableId),
                    ctx = { worksheet: worksheetName, table: table.html() },
                    href = uri + base64(format(template, ctx));
                return href;
            }
        };
    }

    factory.GetTBillsByVolume = function () {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.get(serviceBase + "/activetrades");
    }


    factory.CreateTrades = function (item) {
        if (!authService.isAuthenticated) {
            $location.url = "/login";
        }
        return $http.post(serviceBase + "/create", item);
    }

    factory.dtDisplay = function () {
        var dataDisplay = DTOptionsBuilder.newOptions()
            .withDisplayLength(5)
            .withOption('bLengthChange', false);
    }

    return factory;

}

createTradeService.$inject = injectParams;

app.factory('createTradeService', createTradeService);