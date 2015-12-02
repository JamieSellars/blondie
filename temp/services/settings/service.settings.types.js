(function(){
    'use-stict';
    angular.module('app').factory('settingsTypesService', ['$http', '$q', function($http, $q){
    
        var typeService = {};
    
        typeService.all = function(){
        return $http.get('/api/types').success(function(data){
            return data;
        });
        };
    
        typeService.save = function(formdata){
            return $http.post('/api/types', formdata).success(function(data){
            return data;
            });
        };
    
        typeService.update = function(formdata){
            return $http.put('/api/types/' + formdata.id, formdata).success(function(data){
            return data;
            });
        };
    
        typeService.get = function(typeId){
            return $http.get('/api/types/' + typeId).success(function(data){
            return data;            });
        };
    
        typeService.destroy = function(typeId){
            return $http.delete('/api/types/' + typeId).success(function(data){
            return data;
            });
        };
    
        return typeService;
    
    }]);
})();
