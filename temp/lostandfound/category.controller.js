(function(){
    
    'use-strict';

    angular.module('app').controller('LostandfoundCategoryController', 
    
    ['lostandfoundCategoriesService','$stateParams','$state',
    
    function(lostandfoundCategoriesService,$stateParams,$state) {
    
        vm = this;

        vm.category = {};

        if( $stateParams.id.length > 0 && $stateParams.id != "new" )
        {
            lostandfoundCategoriesService.get($stateParams.id).then(function(res){
                vm.category = res.data[0];
            });
        }


        vm.save = function() {

            if( vm.category.id ) {
                update();
            } else {
                create();
            }
            
        }

        vm.delete = remove;

        function update(){

            lostandfoundCategoriesService.update(vm.category).then(function(res){
                $state.go('lostandfound.settings.categories')                
            });

        }

        function create() {

            lostandfoundCategoriesService.save(vm.category).then(function(res){
                $state.go('lostandfound.settings.categories')
            });

        }

        function remove() {
            
            lostandfoundCategoriesService.destroy(vm.category.id).then(function(){
              
                $state.go('lostandfound.settings.categories')
                
            })

        }

    }]);
    

})();