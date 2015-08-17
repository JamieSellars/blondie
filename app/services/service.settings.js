angular.module('app').factory('settingsUserService', ['$http', '$q', function($http, $q){

    var userService = {};

    userService.save = function(formdata){
        return $http.post('/api/users');
    };

    return userService;

}]);
