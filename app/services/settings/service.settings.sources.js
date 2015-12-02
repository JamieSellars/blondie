(function() {
        'use-strict';
        angular.module('app').factory('settingsSourcesService', ['$http', '$q', function($http, $q){
    
        var sourceService = {};
    
        sourceService.all = function(){
        return $http.get('/api/sources').success(function(data){
            return data;
        });
        };
    
        sourceService.save = function(formdata){
            return $http.post('/api/sources', formdata).success(function(data){
            return data;
            });
        };
    
        sourceService.update = function(formdata){
            return $http.put('/api/sources/' + formdata.id, formdata).success(function(data){
            return data;
            });
        };
    
        sourceService.get = function(sourceId){
            return $http.get('/api/sources/' + sourceId).success(function(data){
            return data;
            });
        };
    
        sourceService.destroy = function(sourceId){
            return $http.delete('/api/sources/' + sourceId).success(function(data){
            return data;
            });
        };
    
        return sourceService;
    
    }]);
})();
