angular.module('Storytime', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ProjectsCtrl',
      templateUrl:'./projects.html'
    })
    .when('/statuts', {
      controller:'StatutsCtrl',
      templateUrl:'./statuts.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('StatutsCtrl', function($scope, $http) {
	 $http.get("./ajax/getStatuts.php").success(function(data){
			$scope.statuts = data;
		});
})

.controller('ProjectsCtrl', function($scope, $http) {
	 $http.get("./ajax/getProjects.php").success(function(data){
			$scope.projects = data;
		});
});

