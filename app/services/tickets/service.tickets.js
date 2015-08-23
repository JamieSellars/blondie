/**
*   AngularJS Application Controller
*   @name:        Ticket Service
*   @description: This will return all available properties for tickets
*                 Types/Sources/Categories etc
*   @author:      jamie sellars (@goingsideways on github)
**/

angular.module('app').factory('ticketService', ['$http', '$q', function($http, $q){

    var ticketService = {};

    ticketService.all = function(){
     return $http.get('/api/tickets').success(function(data){
        return data;
      });
    }

    ticketService.save = function(ticketdata){
     return $http.post('/api/tickets', ticketdata).success(function(data){
        return data;
      });
    }

    ticketService.get = function(ticketid){
     return $http.get('/api/tickets/' + ticketid).success(function(data){
        return data;
      });
    }

    ticketService.update = function(ticketdata){
     return $http.put('/api/tickets/' + ticketdata.id, ticketdata).success(function(data){
        return data;
      });
    }

    ticketService.destroy = function(ticketid){
     return $http.delete('/api/tickets/' + ticketid).success(function(data){
        return data;
      });
    }

    ticketService.destroy = function(ticketid){
     return $http.delete('/api/tickets/' + ticketid).success(function(data){
        return data;
      });
    }

    ticketService.open = function(){
      return $http.get('/api/dashboard/open').success(function(data){
        return data;
      });
    }
    ticketService.closed = function(){
      return $http.get('/api/dashboard/closed').success(function(data){
        return data;
      });
    }

    return ticketService;

  }]);
