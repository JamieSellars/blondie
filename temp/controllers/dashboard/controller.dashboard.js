/**
*   AngularJS Application Controller
*   @name:        homeController (dashboard)
*   @description: dashboard functions shared on the view - such as is logged in
*   @author:      jamie sellars (@goingsideways on github)
**/
angular.module('app').controller('dashboardController',['$scope', 'ticketService', function($scope,ticketService){

    vm = this;
    vm.title = "dashboard";

    /* instatiate model */
    vm.tickets = {};

    ticketService.open().then(function(d){
      /**
        Collect open work orders | limit to 10
      **/
      vm.tickets.open = d.data;

    });
    ticketService.closed().then(function(d){
      /**
        Collect recently closed work orders | limit to 5
      **/
      vm.tickets.closed = d.data;

    });

}]);
