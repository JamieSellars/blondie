(function(){
    'use-stict';
    angular.module('app').factory('lostandfoundLocationsService', ['$http', '$q', function($http, $q){ 
    
        var service = {};
    
        service.all = function(){
            return $http.get('/api/lostandfound/locations').success(function(data){
                return data;
            });
        };
    
        service.save = function(formdata){
            return $http.post('/api/lostandfound/locations', formdata).success(function(data){
                return data;
            });
        };
    
        service.update = function(formdata){
            return $http.put('/api/lostandfound/locations/' + formdata.id, formdata).success(function(data){
                return data;
            });
        };
    
        service.get = function(locationsId){
            return $http.get('/api/lostandfound/locations/'+ locationsId).success(function(data){
                return data;
            });
        };
    
        service.destroy = function(locationsId){
            return $http.delete('/api/lostandfound/locations/' + locationsId).success(function(data){
                return data;
            });
        };
    
        return service;
    
    }]);
})();
