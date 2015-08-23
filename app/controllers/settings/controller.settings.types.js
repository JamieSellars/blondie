/**
*   AngularJS Application Controller
*   @name:        settingsController | types
*   @description: settomgs functions shared on the view - user settings / types
*   @author:      jamie sellars (@goingsideways on github)
**/
angular.module('app').controller('typesSettingsController', ['$scope','settingsSourcesService','alertService', function($scope,settingsSourcesService,alertService){

    vm = this;

    /**
      Users
      @description: put functions for user tab here
    **/
    vm.types = {
      all: {},

      /** FORM DATA **/

      get: function(){
        settingsSourcesService.all().then(function(d){
            vm.types.all = d.data.data;
        });
      },

      create: function(){
        // create username string
        settingsSourcesService.save(vm.types.formdata).then(function success(d){
            alertService('success', 'Feedback Type Created!');
            vm.types.formdata = {};
            vm.types.add = false;
            vm.types.get();
        }, function error(err){
            alertService('danger', 'oops!', 'Could not create feedback type: [' + err.status + '] ' + err.data)
        });
      }
    };

    vm.types.get();

}]);

/**
*   AngularJS Application Controller
*   @name:        settingsController | type
*   @description: settomgs functions shared on the view - user settings / types
*   @author:      jamie sellars (@goingsideways on github)
**/
angular.module('app').controller('typeController', ['$scope','settingsSourcesService','alertService', '$stateParams', '$injector', function($scope,settingsSourcesService,alertService,$stateParams,$injector){

  vm = this;
  vm.user = {};

  (function user(){

    settingsSourcesService.get($stateParams.id).then(function(d){
      vm.formdata = d.data;
    });

  })();

  vm.update = function(){
    settingsSourcesService.update(vm.formdata).then(function(d){
      alertService('success', 'Success!', "Details updated");
    });
  };

  vm.destroy = function(){
    settingsSourcesService.destroy(vm.formdata.id).then(function(d){
      $injector.get('$state').transitionTo('settings.types');
    });
  }

}]);
