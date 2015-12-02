/**
*   AngularJS Application Controller
*   @name:        settingsController | subCategories
*   @description: settomgs functions shared on the view - user settings / subCategories
*   @author:      jamie sellars (@goingsideways on github)
**/
(function(){
    'use-stict';
  angular.module('app').controller('subCategoriesSettingsController', ['$scope','settingsSubCategoriesService','alertService','$stateParams', function($scope,settingsSubCategoriesService,alertService,$stateParams){
  
      vm = this;
  
      /**
        Categorys
        @description: put functions for user tab here
      **/
  
  
      vm.subCategories = {
        all: {},
  
        /** FORM DATA **/
  
        get: function(){
          settingsSubCategoriesService.all($stateParams.categoryId).then(function(d){
              vm.categoryDetails = d.data.data[0];
              vm.subCategories.all = d.data.data[0].subcategories;
          });
        },
  
  
        create: function(){
          // create username string
          vm.subCategories.formdata.category = $stateParams.categoryId;
          settingsSubCategoriesService.save(vm.subCategories.formdata).then(function success(d){
              alertService('success', 'Sub Category Created!', d.data.name + ' has been created.');
              vm.subCategories.formdata = {};
              vm.subCategories.add = false;
              vm.subCategories.get();
          }, function error(err){
              alertService('danger', 'oops!', 'Could not create Sub Category: [' + err.status + '] ' + err.data)
          });
        }
      };
  
      vm.subCategories.get();
  
  }]);
  
  /**
  *   AngularJS Application Controller
  *   @name:        settingsController | subCategory
  *   @description: settomgs functions shared on the view - user settings / subCategories
  *   @author:      jamie sellars (@goingsideways on github)
  **/
  angular.module('app').controller('subCategorySettingsController', ['$scope','settingsSubCategoriesService','alertService', '$stateParams', '$injector', function($scope,settingsSubCategoriesService,alertService,$stateParams,$injector){
  
    vm = this;
    vm.user = {};
  
    (function user(){
  
      settingsSubCategoriesService.get($stateParams.id).then(function(d){
        vm.formdata = d.data;
      });
  
    })();
  
    vm.update = function(){
      settingsSubCategoriesService.update(vm.formdata).then(function(d){
        alertService('success', 'Success!', "Details updated");
        $injector.get('$state').transitionTo('settings.subcategories', { categoryId: vm.formdata.category });
      });
    };
  
    vm.destroy = function(){
      settingsSubCategoriesService.destroy(vm.formdata.id).then(function(d){
        $injector.get('$state').transitionTo('settings.subcategories', { categoryId: vm.formdata.category });
      });
    }
  
  }]);
})();
