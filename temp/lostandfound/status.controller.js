(function(){
    
    'use-strict';

    angular.module('app').controller('LostandfoundStatusController', 
    
    ['lostandfoundStatusService','$stateParams','$state',
    
    function(lostandfoundStatusService,$stateParams,$state) {
    
        vm = this;

        vm.status = {};
       
        if( $stateParams.id.length > 0 && $stateParams.id != "new" )
        {
            lostandfoundStatusService.get($stateParams.id).then(function(res){
                vm.status = res.data[0];
            });
        }


        vm.save = function() {

            if( vm.status.id ) {
                update();
            } else {
                create();
            }
            
        }

        vm.delete = remove;

        function update(){

            lostandfoundStatusService.update(vm.status).then(function(res){
                $state.go('lostandfound.settings.statuses');                
            });

        }

        function create() {

            lostandfoundStatusService.save(vm.status).then(function(res){
                $state.go('lostandfound.settings.statuses');
            });

        }

        function remove() {
            
            lostandfoundStatusService.destroy(vm.status.id).then(function(){              
                $state.go('lostandfound.settings.statuses');                
            })

        }

    }]);
    

})();