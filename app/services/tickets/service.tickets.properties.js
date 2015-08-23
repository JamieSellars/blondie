/**
*   AngularJS Application Controller
*   @name:        Ticket Properties
*   @description: This will return all available properties for tickets
*                 Types/Sources/Categories etc
*   @author:      jamie sellars (@goingsideways on github)
**/

angular.module('app').factory('ticketPropertiesService', ['$http', '$q', function($http, $q){

    var propertyService = {};

    propertyService.get = function(){
     return $http.get('/api/properties').success(function(data){
        return data;
      });
    }

    return propertyService;

  }]);
