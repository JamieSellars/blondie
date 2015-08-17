/**
*   AngularJS Application Controller
*   @name:        settingsController
*   @description: settomgs functions shared on the view - user settings / category
*   @author:      jamie sellars (@goingsideways on github)
**/
angular.module('app').controller('settingsController', ['$scope','settingsUserService', function($scope,settingsUserService){

    vm = this;
    vm.title = "settings";


    /**

      Users
      @description: put functions for user tab here

    **/

    vm.users = {
      /** FORM DATA **/
      save: function(){
        // Save form data to database
        // Creates a user and will return the username in plain text.
        // user will need to change their password on first login

        // create username string
        vm.users.formdata.username = vm.users.formdata.firstname.toLowerCase().charAt(0).concat(vm.users.formdata.lastname.substr(0, vm.users.formdata.lastname.length));

        settingsUserService.save(vm.users.formdata);

      }
    };


}]);
