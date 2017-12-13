(function(){
    
        'use-strict';
    
        angular.module('app').controller('LostandFoundStatusesController', ['lostandfoundStatusService', function(lostandfoundStatusService) {
       
            vm = this;
            vm.items = [];
    
            getItems();
    
            // Get list of missing items.    
            function getItems() {
    
                lostandfoundStatusService
                .all()
                .then( function( res ) {
    
                    vm.items = res.data;
    
                });
    
            }
    
        }]);
        
    
    })();