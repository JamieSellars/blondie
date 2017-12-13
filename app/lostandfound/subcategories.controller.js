(function(){
    
        'use-strict';
    
        angular.module('app').controller('LostandfoundSubcategoriesController', ['$stateParams','lostandfoundSubcategoriesService', function($stateParams,lostandfoundSubcategoriesService) {
       
            vm = this;
            vm.items = [];
            vm.categoryId = $stateParams.id;
            getItems();
    
            // Get list of missing items.    
            function getItems() {
    
                lostandfoundSubcategoriesService
                .all($stateParams.id)
                .then( function( res ) {
    
                    vm.items = res.data[0].subcategories;
    
                });
    
            }
    
        }]);
        
    
    })();