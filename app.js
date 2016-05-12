var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope, someService) {

  //set some properties
  $scope.foo = 'foo';
  $scope.bar = 'bar';


  //add a simple function.
  $scope.test1 = function (){
    $scope.foo = $scope.foo + '!!!';
  };

  //set up a $watch.
  $scope.$watch('bar', function (v){
    $scope.baz = v + 'baz';
  });

  //make a call to an injected service.
  $scope.test2 = function (){
    someService.someAsyncCall($scope.foo)
      .then(function(data) {
        $scope.fizz = data;
      });
  };
}); 

app.factory('someService', function ($timeout, $q){
  return {

    // simple method to do something asynchronously.
    someAsyncCall: function (x){
      var deferred = $q.defer();
      $timeout(function (){
        deferred.resolve(x + '_async');
      }, 100);
      return deferred.promise;
    }
  };
});
