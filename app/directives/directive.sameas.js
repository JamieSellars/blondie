(function(){
    'use-stict';
angular.module('app').directive('sameAs', function(){

    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl){
          function validateEqual(value){
              var valid = (value === scope.$eval(attrs.sameAs));
              ngModelCtrl.$setValidity('equal', valid);
              return valid ? value : undefined;
          }

          ngModelCtrl.$parsers.push(validateEqual);
          ngModelCtrl.$formatters.push(validateEqual);

          scope.$watch(attrs.validateEquals, function(){
            ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
          })

        }
    };

});
})();
