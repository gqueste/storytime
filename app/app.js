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
    .when('/edit_project/:projectId', {
      controller:'EditProjectCtrl',
      templateUrl:'./edit_project.html' 
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
})

.controller('EditProjectCtrl', function($scope, $routeParams, $http) {
	//Not secure dans le cas de multi-users
	var project_id = $routeParams.projectId;
	$http.get("./ajax/getProjectByID.php?project_id="+project_id).success(function(data){
			$scope.current_project = data;
		});
  $http.get("./ajax/getStatuts.php").success(function(data){
      $scope.statuts = data;
    });
  $http.get("./ajax/getProjects.php").success(function(data){
      $scope.parent_projects = data;
    });
  $http.get("./ajax/getChildrenProjectsByID.php?project_id="+project_id).success(function(data){
      $scope.children_projects = data;
    });
  $http.get("./ajax/getEventsByProjectID.php?project_id="+project_id).success(function(data){
      $scope.events = data;
    });
  $http.get("./ajax/getLocationsByProjectID.php?project_id="+project_id).success(function(data){
      $scope.locations = data;
    });
  $http.get("./ajax/getCharactersByProjectID.php?project_id="+project_id).success(function(data){
      $scope.characters = data;
    });
});

