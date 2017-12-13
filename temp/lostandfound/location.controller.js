(function(){
    
    'use-strict';

    angular.module('app').controller('LocationController', 
    
    ['lostandfoundLocationsService','$stateParams','$state',
    
    function(lostandfoundLocationsService,$stateParams,$state) {
    
        vm = this;

        vm.location = {};
       
        if( $stateParams.id.length > 0 && $stateParams.id != "new" )
        {
            lostandfoundLocationsService.get($stateParams.id).then(function(res){
                vm.location = res.data[0];
            });
        }


        vm.save = function() {

            if( vm.location.id ) {
                update();
            } else {
                create();
            }
            
        }

        vm.delete = remove;

        function update(){

            lostandfoundLocationsService.update(vm.location).then(function(res){
                $state.go('lostandfound.settings.locations');                
            });

        }

        function create() {

            lostandfoundLocationsService.save(vm.location).then(function(res){
                $state.go('lostandfound.settings.locations');
            });

        }

        function remove() {
            
            lostandfoundLocationsService.destroy(vm.location.id).then(function(){              
                $state.go('lostandfound.settings.locations');                
            })

        }

    }]);
    

})();