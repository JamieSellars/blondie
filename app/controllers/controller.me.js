/**
*   AngularJS Application Controller
*   @name:        settingsController
*   @description: settomgs functions shared on the view - user settings / category
*   @author:      jamie sellars (@goingsideways on github)
**/
(function(){
    'use-stict';
angular.module('app').controller('meController',

['$scope','settingsUserService','alertService', 

function($scope,settingsUserService,alertService){

    vm = this;
    vm.title = "change password";
    vm.password = {};


    vm.meChangePassword = function(){
      vm.password.processing = true;
      settingsUserService.meChangePassword(vm.passwordData).then(function(d){
        vm.password.processing = false;
        vm.passwordData = null;
        alertService('success', 'Password successfully changed');
      }, function(err){
        vm.password.processing = false;
        alertService('warning', 'Warning: ', err.data, 2000);
      });
    };

}]);
})();
