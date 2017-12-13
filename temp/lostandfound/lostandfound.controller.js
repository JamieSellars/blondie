(function(){

    'use-strict';

    angular.module('app').controller('LostandFoundController', ['lostandfoundService', function(lostandfoundService) {
   
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