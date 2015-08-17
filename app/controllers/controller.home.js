/**
*   AngularJS Application Controller
*   @name:        homeController (dashboard)
*   @description: dashboard functions shared on the view - such as is logged in
*   @author:      jamie sellars (@goingsideways on github)
**/
angular.module('app').controller('homeController', ['$scope', function($scope){

    vm = this;
    vm.title = "dashboard";

}]);
