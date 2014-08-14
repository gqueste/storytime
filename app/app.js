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
    .when('/edit_event/:projectId/:elementId', {
      controller:'EditEventCtrl',
      templateUrl:'./edit_event.html' 
    })
    .when('/edit_location/:projectId/:elementId', {
      controller:'EditLocationCtrl',
      templateUrl:'./edit_location.html' 
    })
    .when('/edit_character/:projectId/:elementId', {
      controller:'EditCharacterCtrl',
      templateUrl:'./edit_character.html' 
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
  
  $scope.editEvent = function(id_proj, id_element) {
    window.location.replace("#/edit_event/"+id_proj+"/"+id_element);
  };
  $scope.editLocation = function(id_project, id_element) {
    window.location.replace("#/edit_location/"+id_proj+"/"+id_element);
  };
  $scope.editCharacter = function(id_project, id_element) {
    window.location.replace("#/edit_character/"+id_proj+"/"+id_element);
  };
})

.controller('EditEventCtrl', function($scope, $routeParams, $http) {
  var project_id = $routeParams.projectId;
  var element_id = $routeParams.elementId;
  $http.get("./ajax/getProjectByID.php?project_id="+project_id).success(function(data){
      $scope.current_project = data;
    });
  $http.get("./ajax/getEventByID.php?project_id="+project_id+"&element_id="+element_id).success(function(data){
      $scope.current_event = data;
    });
})

.controller('EditLocationCtrl', function($scope, $routeParams, $http) {
  var project_id = $routeParams.projectId;
  var element_id = $routeParams.elementId;
  $http.get("./ajax/getProjectByID.php?project_id="+project_id).success(function(data){
      $scope.current_project = data;
    });
  $http.get("./ajax/getLocationByID.php?project_id="+project_id+"&element_id="+element_id).success(function(data){
      $scope.current_location = data;
    });
})

.controller('EditCharacterCtrl', function($scope, $routeParams, $http) {
  var project_id = $routeParams.projectId;
  var element_id = $routeParams.elementId;
  $http.get("./ajax/getProjectByID.php?project_id="+project_id).success(function(data){
      $scope.current_project = data;
    });
  $http.get("./ajax/getCharacterByID.php?project_id="+project_id+"&element_id="+element_id).success(function(data){
      $scope.current_character = data;
    });
});

