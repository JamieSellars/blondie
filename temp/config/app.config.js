/**
*   AngularJS Application Controller
*   @name:        application configuration
*   @description: app settings for angular
*   @author:      jamie sellars (@goingsideways on github)
**/
"use-strict";
angular.module('app')

/**
*   @name:        Application HTTP configuration
*   @description: Attach AuthInterceptor service (services/services.auth.js) to all http negotiations
**/
.config(['$httpProvider', function($httpProvider){

  $httpProvider.interceptors.push('AuthInterceptor');

}])

/**
*   @name:        Application State Configuration
*   @description: Using angular-ui-router to handle angular JS application states for ui-views
**/
.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    // Unsatifised routes / states
    $urlRouterProvider.when('/settings', 'settings/categories');
    //$urlRouterProvider.when('/tickets', 'tickets/all');

    $urlRouterProvider.otherwise("/");

    // Programmed states
    $stateProvider

      .state('home', {
          url: "/",
          templateUrl: "views/view.dashboard.html",
          controller: "dashboardController as dashboard"
      })

      /**
      *   @description: TICKETS
      **/
      .state('tickets', {
          url: "/tickets",
          templateUrl: "views/tickets/tickets.main.html"
      })
      /**
      *   @description: TICKETS | States
      **/
      .state('tickets.all', {
          url: "/all",
          parent: "tickets",
          templateUrl: "views/tickets/tickets.all.html",
          controller: "ticketsController as tickets"
      })

      .state('tickets.create', {
          url: "/create",
          parent: "tickets",
          templateUrl: "views/tickets/tickets.create.html",
          controller: "ticketsCreateController as ticket"
      })

      .state('tickets.view', {
          url: "/ticket/:id",
          parent: "tickets",
          templateUrl: "views/tickets/tickets.create.html",
          controller: "ticketsCreateController as ticket"
      })

      /**
      *   @description: SETTINGS STATES
      **/
      .state('settings', {
          url: "/settings",
          templateUrl: '/views/view.settings.html'
      })
      /**
      *   @description: SETTINGS > CATEGORIES
      **/
      .state('settings.categories', {
          url: "/categories",
          parent: 'settings',
          templateUrl: "views/partials/settings/categories/partial.categories.html",
          controller: "categoriesSettingsController as settings"
      })
      .state('settings.category', {
          url: "/category/:id",
          parent: 'settings',
          templateUrl: "views/partials/settings/categories/partial.category.html",
          controller: "categorySettingsController as category"
      })
      /**
      *   @description: SETTINGS > SUB-CATEGORIES
      **/
      .state('settings.subcategories', {
          url: "/subcategories/:categoryId",
          parent: 'settings',
          templateUrl: "views/partials/settings/subcategories/partial.subcategories.html",
          controller: "subCategoriesSettingsController as settings"
      })
      .state('settings.subcategory', {
          url: "/subcategory/:id",
          parent: 'settings',
          templateUrl: "views/partials/settings/subcategories/partial.subcategory.html",
          controller: "subCategorySettingsController as subCategory"
      })
      /**
      *   @description: SETTINGS > STATUSES
      **/
      .state('settings.statuses', {
          url: "/statuses",
          parent: 'settings',
          templateUrl: "views/partials/settings/statuses/partial.statuses.html",
          controller: "statusesSettingsController as settings"
      })
      .state('settings.status', {
          url: "/status/:id",
          parent: 'settings',
          templateUrl: "views/partials/settings/statuses/partial.status.html",
          controller: "statusSettingsController as status"
      })
      /**
      *   @description: SETTINGS > SOURCES
      **/
      .state('settings.sources', {
          url: "/sources",
          parent: 'settings',
          templateUrl: "views/partials/settings/sources/partial.sources.html",
          controller: "sourcesSettingsController as settings"
      })
      .state('settings.source', {
          url: "/source/:id",
          parent: 'settings',
          templateUrl: "views/partials/settings/sources/partial.source.html",
          controller: "sourceController as source"
      })
      /**
      *   @description: SETTINGS > USERS
      **/
      .state('settings.users', {
          url: "/users",
          parent: 'settings',
          templateUrl: "views/partials/settings/users/partial.users.html",
          controller: "usersSettingsController as settings"
      })
      .state('settings.user', {
        url: '/user/:id',
        parent: 'settings',
        templateUrl: "views/partials/settings/users/partial.user.html",
        controller: "userController as user"
      })
      /**
      *   @description: SETTINGS > TYPES
      **/
      .state('settings.types', {
          url: "/types",
          parent: 'settings',
          templateUrl: "views/partials/settings/types/partial.types.html",
          controller: "typesSettingsController as settings"
      })
      .state('settings.type', {
        url: '/type/:id',
        parent: 'settings',
        templateUrl: "views/partials/settings/types/partial.type.html",
        controller: "typeController as type"
      })
    // authentication
    .state('signin', {
        url: "/signin", // UI will show login window
        templateUrl: "views/view.home.html"
    })
    .state('changepassword', {
        url: "/changepassword", // UI will show login window
        templateUrl: "views/partials/me/partial.changepassword.html",
        controller: "meController as me"
    })
    // Error Pages
    .state('403', {
      url: "/403",
      templateUrl: "views/err/403.html"
    });

}]);
