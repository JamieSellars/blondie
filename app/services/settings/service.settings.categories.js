(function(){
    'use-stict';
    angular.module('app').factory('settingsCategoriesService', ['$http', '$q', function($http, $q){
    
        var categoryService = {};
    
        categoryService.all = function(){
        return $http.get('/api/categories').success(function(data){
            return data;
        });
        };
    
        categoryService.save = function(formdata){
            return $http.post('/api/categories', formdata).success(function(data){
            return data;
            });
        };
    
        categoryService.update = function(formdata){
            return $http.put('/api/categories/' + formdata.id, formdata).success(function(data){
            return data;
            });
        };
    
        categoryService.get = function(categoryid){
            return $http.get('/api/categories/' + categoryid).success(function(data){
            return data;
            });
        };
    
        categoryService.destroy = function(categoryid){
            return $http.delete('/api/categories/' + categoryid).success(function(data){
            return data;
            });
        };
        categoryService.activate = function(categoryid){
            return $http.put('/api/categories/activate/' + categoryid).success(function(data){
                return data;
            });
        };
    
        return categoryService;
    
    }]);
})();
