(function(){
    'use-stict';
    angular.module('app').factory('lostandfoundCategoriesService', ['$http', '$q', function($http, $q){
    
        var categoryService = {};
    
        categoryService.all = function(){
            return $http.get('/api/lostandfound/categories').success(function(data){
                return data;
            });
        };
    
        categoryService.save = function(formdata){
            return $http.post('/api/lostandfound/categories', formdata).success(function(data){
                return data;
            });
        };
    
        categoryService.update = function(formdata){
            return $http.put('/api/lostandfound/categories/' + formdata.id, formdata).success(function(data){
                return data;
            });
        };
    
        categoryService.get = function(categoryid){
            return $http.get('/api/lostandfound/categories/' + categoryid).success(function(data){
                return data;
            });
        };
    
        categoryService.destroy = function(categoryid){
            return $http.delete('/api/lostandfound/categories/' + categoryid).success(function(data){
                return data;
            });
        };
    
        return categoryService;
    
    }]);
})();
