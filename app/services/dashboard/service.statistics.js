/**
*   AngularJS Application Controller
*   @name:        Dashboard Statistics Service
*   @description: Return statistics about queried types and records
*   @author:      jamie sellars (@goingsideways on github)
**/
(function(){
    
    'use-stict';
    angular.module('app').factory('statisticsService', ['$http', '$q', function($http, $q){
    
        var statistics = {};
    
        statistics.get = function(type){
    
        /**
        * @description: will return statistics based on ticket type (category/type/source etc)
        **/
        return $http.get("/api/dashboard/statistics/" + type).success(function(data){
            return data;
        });
    
        }
    
        return statistics;
    
    }]);
    
})();