(function(){
    'use-stict';
    angular.module('app').factory('lostandfoundStatusService', ['$http', '$q', function($http, $q){
    
        var service = {};
    
        service.all = function(){
            return $http.get('/api/lostandfound/status').success(function(data){
                return data;
            });
        };
    
        service.save = function(formdata){
            return $http.post('/api/lostandfound/status', formdata).success(function(data){
                return data;
            });
        };
    
        service.update = function(formdata){
            return $http.put('/api/lostandfound/status/' + formdata.id, formdata).success(function(data){
                return data;
            });
        };
    
        service.get = function(statusId){
            return $http.get('/api/lostandfound/categories/'+ statusId).success(function(data){
                return data;
            });
        };
    
        service.destroy = function(statusId){
            return $http.delete('/api/lostandfound/status/' + statusId).success(function(data){
                return data;
            });
        };
    
        return service;
    
    }]);
})();
