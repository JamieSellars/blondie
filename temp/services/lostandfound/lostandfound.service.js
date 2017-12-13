(function(){
    'use-stict';
    angular.module('app').factory('lostandfoundService', ['$http', '$q', function($http, $q){ 
    
        var service = {};
    
        service.all = function(){
            return $http.get('/api/lostandfound/').success(function(data){
                return data;
            });
        };
    
        service.save = function(formdata){
            return $http.post('/api/lostandfound/', formdata).success(function(data){
                return data;
            });
        };
    
        service.update = function(formdata){
            return $http.put('/api/lostandfound/' + formdata.id, formdata).success(function(data){
                return data;
            });
        };
    
        service.get = function(Id){
            return $http.get('/api/lostandfound/'+ Id).success(function(data){
                return data;
            });
        };
    
        service.destroy = function(Id){
            return $http.delete('/api/lostandfound/' + Id).success(function(data){
                return data;
            });
        };

        service.properties = function(){
            return $http.get('/api/lostandfound/properties').success(function(data){
                return data;
            });
        }
    
        return service;
    
    }]);
})();
