/**
*   AngularJS Application Controller
*   @name:        homeController (dashboard)
*   @description: dashboard functions shared on the view - such as is logged in
*   @author:      jamie sellars (@goingsideways on github)
**/
angular.module('app').controller('statisticsController',['$scope', '$stateParams','statisticsService', function($scope, $stateParams, statisticsService){

    var view = this;

    view.statisticQuery = $stateParams.item;

    statisticsService.get(view.statisticQuery).then(function(d){
      view.data = d.data;

        view.labels = [];
        view.chartdata = [];

        for(var key in d.data){
          view.labels.push(d.data[key].name);
          view.chartdata.push(d.data[key].total);
        }
    });

}]);
