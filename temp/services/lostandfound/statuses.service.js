(function(){
    'use-stict';
    angular.module('app').factory('lostandfoundStatusService', ['$http', '$q', function($http, $q){
    
        var service = {};
    
        service.all = function(){
            return $http.get('/api/lostandfound/statuses').success(function(data){
                return data;
            });
        };
    
        service.save = function(formdata){
            return $http.post('/api/lostandfound/statuses', formdata).success(function(data){
                return data;
            });
        };
    
        service.update = function(formdata){
            return $http.put('/api/lostandfound/statuses/' + formdata.id, formdata).success(function(data){
                return data;
            });
        };
    
        service.get = function(statusId){
            return $http.get('/api/lostandfound/statuses/'+ statusId).success(function(data){
                return data;
            });
        };
    
        service.destroy = function(statusId){
            return $http.delete('/api/lostandfound/statuses/' + statusId).success(function(data){
                return data;
            });
        };
    
        return service;
    
    }]);
})();
