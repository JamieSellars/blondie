(function(){
    
        'use-strict';
    
        angular.module('app').controller('LocationsController', ['lostandfoundLocationsService', function(lostandfoundLocationsService) {
       
            vm = this;
            vm.items = [];
    
            getItems();
    
            // Get list of missing items.    
            function getItems() {
    
                lostandfoundLocationsService
                .all()
                .then( function( res ) {
    
                    vm.items = res.data;
    
                });
    
            }
    
        }]);
        
    
    })();