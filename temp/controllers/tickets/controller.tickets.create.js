/**
*   AngularJS Application Controller
*   @name:        Tickets Create Controller
*   @description:
*   @author:      jamie sellars (@goingsideways on github)
**/
(function(){
    'use-stict';
  angular.module('app').controller('ticketsCreateController', ['$scope', 'Auth', '$rootScope','$state', '$window','ticketPropertiesService','ticketService','$stateParams', function($scope, Auth, $rootScope, $state, $window,ticketPropertiesService,ticketService,$stateParams){
  
      vm = this;
      vm.title = "Create Ticket";
      vm.properties;
      vm.formdata = {};
      vm.processing = false;
      vm.update = true;
      vm.view = false;
  
      ticketPropertiesService.get().then(function(d){
  
        vm.properties = d.data;
  
        /**
        *
        *   populate the values of the category drop down menus when viewing a ticket.
        *
        **/
        if($stateParams.id){
          vm.view = true;
  
          /** change state of button **/
          vm.title = "Update Ticket";
  
          ticketService.get($stateParams.id).then(function(d){
            // Bind data to form
            vm.formdata = d.data;
  
            var categoryid = vm.formdata.category;
            angular.forEach(vm.properties.categories, function(value, idx){
              if(value.id === categoryid){
                vm.formdata.category = value;
                vm.properties.subcategories = value.subcategories;
              }
            });
          });
  
  
        }
      });
  
      vm.getSubCategories = function(){
          vm.properties.subcategories = vm.formdata.category.subcategories;
      }
  
      vm.save = function(){
  
        vm.processing = true;
        /**
        * if editing an existing item
        **/
        if($stateParams.id){
          // replace object of category with id
          vm.formdata.category = vm.formdata.category.id;
          ticketService.update(vm.formdata).then(function(d){
              // Change State :: TODO
              $state.go('tickets.all', {}, { reload: true });
          });
  
        } else {
  
          // replace object of category with id
          vm.formdata.category = vm.formdata.category.id;
          ticketService.save(vm.formdata).then(function(d){
              // Change State :: TODO
              $state.go('tickets.all', {}, { reload: true });
          });
  
        }
      };
  
  
      vm.destory = function(){
        var choice = confirm("Are you sure you wish to destroy this ticket", "Annihilate");
        if(choice){
          ticketService.destroy($stateParams.id).then(function(d){
            $state.go('tickets.all');
          });
        }
      }
  
  
  }]);
  
  angular.module('app').controller('ticketsQuickController', ['$scope', 'Auth', '$rootScope','$state', '$window','ticketPropertiesService','ticketService','$stateParams', function($scope, Auth, $rootScope, $state, $window,ticketPropertiesService,ticketService,$stateParams){
  
      vm = this;
      vm.title = "Quick Entry";

      vm.user = $rootScope.user.id;
      vm.formdata = {
        assigned: vm.user
      };

      ticketPropertiesService.get().then(function(d){
  
        vm.properties = d.data;
  
      });

  
      vm.getSubCategories = function(category){
        vm.properties.subcategories = category.subcategories;
      }
  
  
      vm.save = function(){
  
        vm.processing = true;
  
        // hard code descriptions
        vm.formdata.title = "Enquiry";
        vm.formdata.description = " ";
        vm.formdata.status = 2; // id for closed this will need to be changed if you create a new database

        vm.formdata.assigned = vm.user;        

        ticketService.save(vm.formdata).then(function(d){
            // Change State :: TODO
            $state.go('tickets.quick', {}, { reload: true });
        });
  
  
      };
  
  
    }]);
})();
