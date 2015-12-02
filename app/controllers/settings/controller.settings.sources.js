/**
*   AngularJS Application Controller
*   @name:        settingsController | sources
*   @description: settomgs functions shared on the view - user settings / sources
*   @author:      jamie sellars (@goingsideways on github)
**/
(function(){
  'use-stict';
  angular.module('app').controller('sourcesSettingsController', ['$scope','settingsSourcesService','alertService', function($scope,settingsSourcesService,alertService){
  
      var vm = this;
  
      /**
        Users
        @description: put functions for user tab here
      **/
      vm.sources = {
        all: {},
  
        /** FORM DATA **/
  
        get: function(){
          settingsSourcesService.all().then(function(d){
              vm.sources.all = d.data.data;
          });
        },
  
        create: function(){
          // create username string
          settingsSourcesService.save(vm.sources.formdata).then(function success(d){
              alertService('success', 'Created!', d.data.name + ' has been created.');
              vm.sources.formdata = {};
              vm.sources.add = false;
              vm.sources.get();
          }, function error(err){
              alertService('danger', 'oops!', 'Could not create source: [' + err.status + '] ' + err.data)
          });
        }
      };
  
      vm.sources.get();
  
  }]);
  
  /**
  *   AngularJS Application Controller
  *   @name:        settingsController | source
  *   @description: settomgs functions shared on the view - user settings / sources
  *   @author:      jamie sellars (@goingsideways on github)
  **/
  angular.module('app').controller('sourceController', ['$scope','settingsSourcesService','alertService', '$stateParams', '$injector', function($scope,settingsSourcesService,alertService,$stateParams,$injector){
  
    var vm = this;
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
        $injector.get('$state').transitionTo('settings.sources');
      });
    }
  
  }]);
})();