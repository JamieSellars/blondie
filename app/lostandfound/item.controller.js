(function(){
    
    'use-strict';

    angular
        .module('app')
        .controller('LostandFoundItemController', 

    ['lostandfoundService','$stateParams','$state',
    
    function(lostandfoundService,$stateParams,$state) {
    
        vm = this;

        vm.item = {};
        vm.properties = {};

        if( $stateParams.id.length > 0 && $stateParams.id != "new" )
        {
            lostandfoundService.get($stateParams.id).then(function(res){
                vm.item = res.data[0];
            });
        }

        lostandfoundService.properties().then(function(res){
            vm.properties = res.data;
        });

        vm.setSubcategories = function(item){
            vm.subcategories = vm.properties.categories.filter(function(x) {
                return x.id == item 
            })[0].subcategories;
        }

        vm.save = function() {

            if( vm.item.id ) {
                update();
            } else {
                create();
            }
            
        }

        vm.delete = remove;

        function update(){

            if( vm.item.status == "5a30725c059dcd1c53a4183b"){
                vm.item.dateOut = new Date();
            }

            lostandfoundService.update(vm.item).then(function(res){
                $state.go('lostandfound.items')
            });

        }

        function create() {

            vm.item.dateIn = new Date();

            lostandfoundService.save(vm.item).then(function(res){
                $state.go('lostandfound.items')
            });

        }

        function remove() {
            
            lostandfoundService.destroy(vm.item.id).then(function(){              
                $state.go('lostandfound.items')                
            })

        }

    }]);
    

})();