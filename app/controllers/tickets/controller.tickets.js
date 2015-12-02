/**
*   AngularJS Application Controller
*   @name:        Tickets Controller
*   @description:
*   @author:      jamie sellars (@goingsideways on github)
**/
(function(){
    'use-stict';
    angular.module('app').controller('ticketsController', ['$scope', 'Auth', '$rootScope','$state', '$window','ticketService',function($scope, Auth, $rootScope, $state, $window,ticketService){
    
        vm = this;
    
        vm.ticketData = {};
    
        ticketService.all().then(function(d){
        vm.ticketData = d.data;
        });
    
    }]);
})();
