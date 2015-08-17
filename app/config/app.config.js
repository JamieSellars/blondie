/**
*   AngularJS Application Controller
*   @name:        application configuration
*   @description: app settings for angular
*   @author:      jamie sellars (@goingsideways on github)
**/
"use-strict";
angular.module('app').config(function($stateProvider, $urlRouterProvider){
    /**
      blondie not found state
      - take unsatisfied routes to homepage
    **/
    $urlRouterProvider.otherwise("home");
    /**
      blondie states
    **/
    $stateProvider
      .state('home', {
          url: "/",
          templateUrl: "views/view.home.html",
          controller: "homeController as home"
      })
      .state('settings', {
          url: "/settings",
          templateUrl: "views/view.settings.html",
          controller: "settingsController as settings"
      })
        /*
          tab states for settings
        */
        .state('settings-categories', {
          url: '/settings/#category'
        })
        .state('settings-status', {
          url: '/settings/#status'
        })
        .state('settings-users', {
          url: '/settings/#users'
        })


});
