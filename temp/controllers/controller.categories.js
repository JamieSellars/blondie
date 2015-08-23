/**
*   AngularJS Application Controller
*   @name:        settingsController | categories
*   @description: settomgs functions shared on the view - user settings / categories
*   @author:      jamie sellars (@goingsideways on github)
**/
angular.module('app').controller('categoriesSettingsController', ['$scope','settingsCategoriesService','alertService', function($scope,settingsCategoriesService,alertService){

    vm = this;

    /**
      Users
      @description: put functions for user tab here
    **/
    vm.categories = {
      all: {},

      /** FORM DATA **/

      get: function(){
        settingsCategoriesService.all().then(function(d){
            vm.categories.all = d.data.data;
        });
      },

      create: function(){
        // create username string
        settingsCategoriesService.save(vm.categories.formdata).then(function success(d){
            alertService('success', 'User Created!', d.data.name + ' has been created.');
            vm.categories.formdata = {};
            vm.categories.add = false;
            vm.categories.get();
        }, function error(err){
            alertService('danger', 'oops!', 'Could not create category: [' + err.status + '] ' + err.data)
        });
      }
    };

    vm.categories.get();

}]);

/**
*   AngularJS Application Controller
*   @name:        settingsController | category
*   @description: settomgs functions shared on the view - user settings / categories
*   @author:      jamie sellars (@goingsideways on github)
**/
angular.module('app').controller('categoryController', ['$scope','settingsCategoriesService','alertService', '$stateParams', '$injector', function($scope,settingsCategoriesService,alertService,$stateParams,$injector){

  vm = this;
  vm.user = {};

  (function user(){

    settingsCategoriesService.get($stateParams.id).then(function(d){
      vm.formdata = d.data;
    });

  })();

  vm.update = function(){
    settingsCategoriesService.update(vm.formdata).then(function(d){
      alertService('success', 'Success!', "Details updated");
    });
  };

  vm.destroy = function(){
    settingsCategoriesService.destroy(vm.formdata.id).then(function(d){
      $injector.get('$state').transitionTo('settings.categories');
    });
  }

}]);
