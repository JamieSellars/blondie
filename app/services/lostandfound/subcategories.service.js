(function(){
    'use-stict';
    angular.module('app').factory('lostandfoundSubcategoriesService', ['$http', '$q', function($http, $q){
    
        var service = {};
    
        service.all = function(categoryId){
            return $http.get('/api/lostandfound/categories/' + categoryId + '/subcategories').success(function(data){
                return data;
            });
        };
    
        service.save = function(formdata){
            return $http.post('/api/lostandfound/subcategories', formdata).success(function(data){
                return data;
            });
        };
    
        service.update = function(formdata){
            return $http.put('/api/lostandfound/subcategories/' + formdata.id, formdata).success(function(data){
                return data;
            });
        };
    
        service.get = function(id){
            return $http.get('/api/lostandfound/subcategories/'+ id).success(function(data){
                return data;
            });
        };
    
        service.destroy = function(subcategoryid){
            return $http.delete('/api/lostandfound/subcategories/' + subcategoryid).success(function(data){
                return data;
            });
        };
    
        return service;
    
    }]);
})();
