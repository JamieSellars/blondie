angular.module('app').factory('settingsSubCategoriesService', ['$http', '$q', function($http, $q){

    var subCategoryService = {};

    subCategoryService.all = function(categoryid){
      return $http.get('/api/subcategories/' + categoryid).success(function(data){
        return data;
      });
    };

    subCategoryService.save = function(formdata){
        return $http.post('/api/subcategories', formdata).success(function(data){
          return data;
        });
    };

    subCategoryService.update = function(formdata){
        return $http.put('/api/subcategory/' + formdata.id, formdata).success(function(data){
          return data;
        });
    };

    subCategoryService.get = function(subcategoryid){
        return $http.get('/api/subcategory/' + subcategoryid).success(function(data){
          return data;
        });
    };

    subCategoryService.destroy = function(subcategoryid){
        return $http.delete('/api/subcategory/' + subcategoryid).success(function(data){
          return data;
        });
    };

    return subCategoryService;

}]);
