angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state("login", {url:"/", templateUrl: "templates/login.html" })
    .state("main", { url:"main",templateUrl: "templates/Main.html" });

    $urlRouterProvider.otherwise('/');
})

.controller("home", function ($scope, $state, $http) {

    $scope.loginModel = {};

    $scope.login = function () {

        $scope.loginModel = {
            userCode: $scope.loginModel.username,
            passWord: $scope.loginModel.password,
            deviceType: "android",
            deviceOsVersion: "5.0"
        };

        $http({
            method: 'POST',
            params: $scope.loginModel,
            url: "http://192.168.8.173:8080/JindaERP/app/UserLogin.do"
        })
        .success(function (response, status, headers, config) {
            $state.go('main');
        })
        .error(function (response, status, headers, config) {
        });
    };
});
