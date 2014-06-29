angular.module('Storytime', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'StatutsCtrl',
      templateUrl:'./statuts.html'
    })
    .when('/ii', {
      controller:'StatutsCtrl',
      templateUrl:'./ii.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('StatutsCtrl', function($scope, $http) {
	 $http.get("./ajax/getStatuts.php").success(function(data){
			$scope.statuts = data;
		});
});

