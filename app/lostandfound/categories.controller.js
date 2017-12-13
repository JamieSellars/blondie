(function(){
    
        'use-strict';
    
        angular.module('app').controller('LostandfoundCategoriesController', ['lostandfoundCategoriesService', function(lostandfoundCategoriesService) {
       
            vm = this;
            vm.items = [];
    
            getItems();
    
            // Get list of missing items.    
            function getItems() {
    
                lostandfoundCategoriesService
                .all()
                .then( function( res ) {
    
                    vm.items = res.data;
    
                });
    
            }
    
        }]);
        
    
    })();