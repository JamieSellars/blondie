angular.module('app').factory('settingsStatusesService', ['$http', '$q', function($http, $q){

    var statusService = {};

    statusService.all = function(){
      return $http.get('/api/statuses').success(function(data){
        return data;
      });
    };

    statusService.save = function(formdata){
        return $http.post('/api/statuses', formdata).success(function(data){
          return data;
        });
    };

    statusService.update = function(formdata){
        return $http.put('/api/statuses/' + formdata.id, formdata).success(function(data){
          return data;
        });
    };

    statusService.get = function(statusId){
        return $http.get('/api/statuses/' + statusId).success(function(data){
          return data;
        });
    };

    statusService.destroy = function(statusId){
        return $http.delete('/api/statuses/' + statusId).success(function(data){
          return data;
        });
    };

    return statusService;

}]);
