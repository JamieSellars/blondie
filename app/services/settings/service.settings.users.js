angular.module('app').factory('settingsUserService', ['$http', '$q', function($http, $q){

    var userService = {};

    userService.all = function(){
      return $http.get('/api/users').success(function(data){
        return data;
      });
    };

    userService.save = function(formdata){
        return $http.post('/api/users', formdata).success(function(data){
          return data;
        });
    };

    userService.update = function(formdata){
        return $http.put('/api/users/' + formdata.id, formdata).success(function(data){
          return data;
        });
    };

    userService.get = function(userid){
        return $http.get('/api/users/' + userid).success(function(data){
          return data;
        });
    };

    userService.destroy = function(userid){
        return $http.delete('/api/users/' + userid).success(function(data){
          return data;
        });
    };

    userService.changePassword = function(formdata){
        return $http.put('/api/changepassword/' + formdata.id, formdata).success(function(data){
          return data;
        });
    };

    userService.meChangePassword = function(formdata){
        return $http.put('/api/me/changepassword', formdata).success(function(data){
          return data;
        });
    };

    return userService;

}]);
