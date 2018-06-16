/**
*   AngularJS Application Controller
*   @name:        Auth Contorller
*   @description: 
*   @author:      jamie sellars (@goingsideways on github)
**/
(function(){

    
    'use-stict';

    angular.module('app').controller('AuthenticationController', 
    
    ['Auth', '$rootScope','$state', 
    
    function(Auth, $rootScope, $state){

       

        vm = this;
        vm.signin = {
            username: null,
            password: null,
            error: null,
            processing: null,
            errorMsg: null
        }


        vm.authenticate = function(){
        
            if( vm.signin == null ) {
                vm.signin = {
                error: null,
                processing: null,
                errorMsg: null
                }
            }
            // Change States
            vm.signin.error = false;
            vm.signin.processing = true;

            Auth.login(vm.signin.username, vm.signin.password).then(function(res) {

                vm.signin.processing = false;

                vm.user = res.data.user;
                $rootScope.user = res.data;

                $state.go("tickets.all", {}, { 
                    reload: true 
                });

            }, function(err){
                    // Change States
                    vm.signin.processing = false;
                    vm.signin.error = true;
                    vm.signin.errorMsg = err.data.err;
            });

        };

    
    }]);

})();