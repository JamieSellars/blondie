/**
*   AngularJS Application Controller
*   @name:        settingsController | statuses
*   @description: settomgs functions shared on the view - user settings / statuses
*   @author:      jamie sellars (@goingsideways on github)
**/
angular.module('app').controller('statusesSettingsController', ['$scope','settingsStatusesService','alertService', function($scope,settingsStatusesService,alertService){

    vm = this;

    /**
      Users
      @description: put functions for user tab here
    **/
    vm.statuses = {

      all: {},

      /** FORM DATA **/

      get: function(){
        settingsStatusesService.all().then(function(d){
            vm.statuses.all = d.data;
        });
      },

      create: function(){
        // create username string
        settingsStatusesService.save(vm.statuses.formdata).then(function success(d){
            alertService('success', 'Status Type Created!');
            vm.statuses.formdata = {};
            vm.statuses.add = false;
            vm.statuses.get();
        }, function error(err){
            alertService('danger', 'oops!', 'Could not create status type: [' + err.status + '] ' + err.data)
        });
      }
    };

    vm.statuses.get();

}]);

/**
*   AngularJS Application Controller
*   @name:        settingsController | status
*   @description: settomgs functions shared on the view - user settings / statuses
*   @author:      jamie sellars (@goingsideways on github)
**/
angular.module('app').controller('statusSettingsController', ['$scope','settingsStatusesService','alertService', '$stateParams', '$injector', function($scope,settingsStatusesService,alertService,$stateParams,$injector){

  vm = this;
  vm.user = {};

  (function user(){

    settingsStatusesService.get($stateParams.id).then(function(d){
      vm.formdata = d.data;
    });

  })();

  vm.update = function(){
    settingsStatusesService.update(vm.formdata).then(function(d){
      alertService('success', 'Success!', "Details updated");
    });
  };

  vm.destroy = function(){
    settingsStatusesService.destroy(vm.formdata.id).then(function(d){
      $injector.get('$state').transitionTo('settings.statuses');
    });
  }

}]);
