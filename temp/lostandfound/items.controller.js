(function(){
    
        'use-strict';
    
        angular
            .module('app')
            .controller('LostandFoundItemsController', 
            
            ['lostandfoundService', 
            
            function(lostandfoundService) {
       
            vm = this;
            vm.items = [];
    
            getItems();
    
            // Get list of missing items.    
            function getItems() {
    
                lostandfoundService
                .all()
                .then( function( res ) {
    
                    vm.items = res.data;
    
                });
    
            }
    
        }]);
        
    
    })();