/**
*   AngularJS Application Controller
*   @name:        settingsController | types
*   @description: settomgs functions shared on the view - user settings / types
*   @author:      jamie sellars (@goingsideways on github)
**/
(function(){
    'use-stict';
  angular.module('app').controller('typesSettingsController', ['$scope','settingsTypesService','alertService', function($scope,settingsTypesService,alertService){
  
      var vm = this;
  
      /**
        Users
        @description: put functions for user tab here
      **/
      vm.types = {
        all: {},
  
        /** FORM DATA **/
  
        get: function(){
          settingsTypesService.all().then(function(d){
              vm.types.all = d.data.data;
          });
        },
  
        create: function(){
          // create username string
          settingsTypesService.save(vm.types.formdata).then(function success(d){
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
  angular.module('app').controller('typeController', ['$scope','settingsTypesServicesService','alertService', '$stateParams', '$injector', function($scope,settingsTypesService,alertService,$stateParams,$injector){
  
    var vm = this;
    vm.user = {};
  
    (function user(){
  
      settingsTypesService.get($stateParams.id).then(function(d){
        vm.formdata = d.data;
      });
  
    })();
  
    vm.update = function(){
      settingsTypesService.update(vm.formdata).then(function(d){
        alertService('success', 'Success!', "Details updated");
      });
    };
  
    vm.destroy = function(){
      settingsTypesService.destroy(vm.formdata.id).then(function(d){
        $injector.get('$state').transitionTo('settings.types');
      });
    }
  
  }]);
})();
