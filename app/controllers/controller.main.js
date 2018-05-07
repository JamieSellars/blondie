/**
*   AngularJS Application Controller
*   @name:        mainController
*   @description: main functions shared on the view - such as is logged in
*   @author:      jamie sellars (@goingsideways on github)
**/
(function(){
    'use-stict';
angular.module('app').controller('mainController', ['$scope', 'Auth', '$rootScope','$state', '$window', function($scope, Auth, $rootScope, $state, $window){

    vm = this;
    vm.signin = {}

    /**
    * @description: authentication actions
    **/
    vm.loggedIn = Auth.isLoggedIn();

    if(vm.loggedIn) {
      Auth.getUser().then(function(res){
        vm.user = res.data[0];
        
        $rootScope.user = vm.user;
      });
    }

    $rootScope.$on('$stateChangeSuccess', function(){
      vm.loggedIn = Auth.isLoggedIn();
    });

    vm.authenticate = function(){
      // Change States
      vm.signin.error = false;
      vm.signin.processing = true;
      Auth.login(vm.signin.username, vm.signin.password).then(function(res) {
        vm.signin.processing = false;

        vm.user = res.data.user;
        $rootScope.user = res.data;

        $state.go("tickets.all", {}, { reload: true });
      }, function(err){
        // Change States
        vm.signin.processing = false;
        vm.signin.error = true;
        vm.signin.errorMsg = err.data.err;
      });
    };
    vm.logout = function(){
      Auth.logout();
      $window.location.reload(true);
    };
    // END AUTH

}]);
})();