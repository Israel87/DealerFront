'use strict';

var app = angular.module('app');

var value = {
    useBreeze: false,
    baseUrl: 'http://localhost:23605/'
};

var baseUrl = "http://localhost:63456/api/";
var accessTokenUrl = "http://localhost:63456/token";

app.value('baseUrl', baseUrl);
app.value('accessTokenUrl', accessTokenUrl);
app.value('config', value);