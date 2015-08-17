/**
*   AngularJS Application Controller
*   @name:        mainController
*   @description: main functions shared on the view - such as is logged in
*   @author:      jamie sellars (@goingsideways on github)
**/
angular.module('app').controller('mainController', ['$scope', function($scope){

    vm = this;
    vm.message = "live reload is working :)";

    /**
      Is User Logged In
    **/
    vm.isLoggedIn = function(){
      return true;
    }

}]);
