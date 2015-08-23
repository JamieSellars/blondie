/**
*   AngularJS  Application
*   @name:        Authentication
*   @description: for handling calls to authentication actions on Web API
*   @author:      jamie sellars (@goingsideways on github)
**/

/**
*   @description: for handling calls to authentication actions on Web API
**/
angular.module('app').factory('Auth', ['$q', '$http', 'AuthToken', function($q, $http, AuthToken){

  var auth = {};

  auth.login = function(username, password){

    return $http.post('/api/auth', {
      username: username,
      password: password
    }).success(function(data){
      AuthToken.set(data.token);
      return data;
    });
  };

  auth.logout = function(){
    AuthToken.set();
  };

  auth.isLoggedIn = function(){
    if(AuthToken.get()){
      return true;
    } else {
      return false;
    }
  };

  auth.getUser = function(){
    if(AuthToken.get()){
      return $http.get('api/me').success(function (d){ return d;});
    } else {
      return $q.reject({ message: 'User not authenticated' });
    }
  };

  return auth;

}])
/**
*   @description:  Getter & Setter for authToken in localStorage for HTML5 browsers
**/
angular.module('app').factory('AuthToken', ['$window', function($window){

  var authToken = {};

  authToken.get = function(){
    return $window.localStorage.getItem('token');
  };

  authToken.set = function(token){
    if(token)
    {
      return $window.localStorage.setItem('token', 'Bearer ' + token);
    } else {
      return $window.localStorage.removeItem('token');
    }
  };

  return authToken;

}])
/**
*   @description:  Http Interceptors for handler application views
*                  backend is secured and has authorisation layers
*                  frontend just handles view states for UI/UX
**/
angular.module('app').factory('AuthInterceptor', ['$q', 'AuthToken', '$location', '$injector', function($q, AuthToken, $location, $injector){

  var authInterceptor = {};

  authInterceptor.request = function(config){
    var token = AuthToken.get();
    if(token)
      config.headers['Authorization'] = token;
    return config;
  }

  authInterceptor.responseError = function(response) {

    // if response contains error
    if(response.status == 401){
      // NOT AUTHENTICATION
      AuthToken.set();
      //$state.go('/signin');
      return $q.reject(response);
    }
    if(response.status == 403){
      $injector.get('$state').transitionTo('403');

      return $q.reject(response);
    }

    return $q.reject(response);

  }

  return authInterceptor;

}]);
