describe("A test controller", function(){
	
	beforeEach(function(){
			module("myApp");
			someServiceMock = jasmine.createSpyObj("someService", ["someAsyncCall"]);
			
			inject(function($rootScope, $controller, $q, _$timeout_){
				$scope = $rootScope.$new();
				
				someServiceMock.someAsyncCall.andReturn($q.when("wee"));
				$timeout = _$timeout_;
				
				ctrl = $controller("MainCtrl", {
					$scope : $scope,
					someService : someServiceMock
				}); 
			}); 
		});
		
	it("should start with foo and bar populate", function(){
		expect($scope.foo).toBe("foo");
		expect($scope.bar).toEqual("bar");
		
	})	
	it("Should add !!! to foo when test1 is called", function(){
		$scope.foo = "foo";
		$scope.test1();
		 
		expect($scope.foo).toEqual("foo!!!"); 
	})
	it("should watch the bar", function(){
		$scope.bar = "bar changed";
		
		//$apply the change to trigger the $watch.
		$scope.$apply();
		expect($scope.baz).toEqual("bar changedbaz");
		
	})
	it("should make some anonymus call", function(){
		$scope.test2();
		expect(someServiceMock.someAsyncCall).toHaveBeenCalled();
		$timeout.flush();
		expect($scope.fizz).toEqual("wee");
		
	});
});














 




 