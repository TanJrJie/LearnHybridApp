angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

//·������ ��ʱ����
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state("login", {
        url: "/",
        templateUrl: "templates/login.html",
        controller: "loginCtrl"
    })

    .state("main", {
        url: "main",
        templateUrl: "templates/Main.html",
        controller: "mainCtrl"
    });

    $urlRouterProvider.otherwise('/');
})

//����
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleLightContent();
        }
    });
});