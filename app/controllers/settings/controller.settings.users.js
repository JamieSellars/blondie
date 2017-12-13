/**
*   AngularJS Application Controller
*   @name:        settingsController
*   @description: settomgs functions shared on the view - user settings / category
*   @author:      jamie sellars (@goingsideways on github)
**/
(function(){
    'use-stict';
  angular.module('app').controller('usersSettingsController', ['$scope','settingsUserService','alertService', function($scope,settingsUserService,alertService){
  
      vm = this;
  
      /**
        Users
        @description: put functions for user tab here
      **/
      vm.users = {
        all: {},
        /** FORM DATA **/
        get: function(){
          settingsUserService.all().then(function(d){
              vm.users.all = d.data;
          });
        },
        // Save form data to database
        // Creates a user and will return the username in plain text.
        // user will need to change their password on first login
        create: function(){
          // create username string
          settingsUserService.save(vm.users.formdata).then(function success(d){
              alertService('success', 'User Created!', d.data.user.username + ' has been created.');
              vm.users.formdata = {};
              vm.users.add = false;
              vm.users.get();
          }, function error(err){
              alertService('danger', 'oops!', 'Could not create user: [' + err.status + '] ' + err.data)
          });
        }
      };
  
      vm.users.get();
  
  }]);
  
  /**
    User
    @description: edit user details
  **/
  angular.module('app').controller('userController', ['$scope','settingsUserService','alertService', '$stateParams', '$timeout','$state', function($scope,settingsUserService,alertService,$stateParams, $timeout, $state){
  
      vm = this;
      vm.user = {};
      vm.passwordData = {};
  
      (function user(){
  
        settingsUserService.get($stateParams.id).then(function(d){
          vm.username = d.data.username;
          vm.formdata = d.data;
        })
  
      })();
  
      vm.update = function(){
        settingsUserService.update(vm.formdata).then(function(d){
          alertService('success', 'Success!', d.data[0].firstname + ' ' +d.data[0].lastname+ ' updated.');
          $state.go('settings.users');
        });
      };
  
      vm.changePassword = function(){
  
        vm.password = {};
        vm.password.processing = true;
        vm.passwordData.id = vm.formdata.id;
  
        settingsUserService.changePassword(vm.passwordData).then(function(d){
          vm.password.processing = false;
          alertService('success', 'Success!', "Password has been changed.");
        })
      };
  
      vm.destroy = function(){
        if(vm.destroydata.username === vm.username){
          vm.destroy.processing = true;
          // call API
          settingsUserService.destroy(vm.formdata.id).then(function(d){
            alertService('success', 'Success!', d.data + " redicting...");
            // redirect
            $timeout(function(){
              $state.go('settings.users');
            },2500)
  
          }, function(err){
            vm.destroy.processing = false;
            alertService('danger', 'oops!', 'Could not create user: [' + err.status + '] ' + err.data);
          });
  
        }else{
          alertService("warning", "User not destroyed", "Username does not match what you enetered.");
        }
  
      };
  }]);
})();