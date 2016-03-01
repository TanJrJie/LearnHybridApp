angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/login");

    $stateProvider
	.state("login", {
	    url: "/login",
	    templateUrl: "templates/login.html"
	})
	.state("main", {
	    url: "/main",
	    templateUrl: "templates/main.html"
	})
    .state("nowquantity", {
        url: "/nowquantity",
        templateUrl: "templates/nowquantity.html"
    });
})

.controller("home", function ($scope, $state, $http) {
    $state.go('login');

    $scope.loginModel = {};

    $scope.login = function () {
        $scope.loginModel = {
            userCode: $scope.loginModel.username,
            passWord: $scope.loginModel.password,
            deviceType: "android",
            deviceOsVersion: "5.0"
        };

        $state.go('main');

        //$http({
        //    method: 'POST',
        //    params: $scope.loginModel,
        //    url: "http://192.168.8.173:8080/JindaERP/app/UserLogin.do"
        //})
        //.success(function (response, status, headers, config) {
        //    $state.go('main');
        //})
        //.error(function (response, status, headers, config) {
        //});
    };
});
