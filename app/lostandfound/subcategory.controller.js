(function(){
    
    'use-strict';

    angular.module('app').controller('LostandfoundSubcategoryController', 
    
    ['lostandfoundSubcategoriesService','$stateParams','$state',
    
    function(lostandfoundSubcategoriesService,$stateParams,$state) {
    
        vm = this;

        vm.subcategory = {};

        if( $stateParams.subcatId.length > 0 && $stateParams.subcatId != "new" )
        {
            lostandfoundSubcategoriesService.get($stateParams.subcatId).then(function(res){
                vm.subcategory = res.data[0];
            });
        }


        vm.save = function() {

            if( vm.subcategory.id ) {
                update();
            } else {
                create();
            }
            
        }

        vm.delete = remove;

        function update(){

            
            lostandfoundSubcategoriesService.update(vm.subcategory).then(function(res){
                $state.go('lostandfound.settings.subcategories', { id: $stateParams.id }, { reload: true })           
            });

        }

        function create() {

            vm.subcategory.category = $stateParams.id;
            lostandfoundSubcategoriesService.save(vm.subcategory).then(function(res){
                $state.go('lostandfound.settings.subcategories', { id: $stateParams.id }, { reload: true })           
            });

        }

        function remove() {
            
            lostandfoundSubcategoriesService.destroy(vm.subcategory.id).then(function(){
              
                $state.go('lostandfound.settings.subcategories',{ id: $stateParams.id }, { reload: true })
                
            })

        }

    }]);
    

})();