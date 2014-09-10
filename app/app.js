angular.module('Storytime', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'AccueilCtrl',
      templateUrl:'./accueil.html'
    })
    .when('/statuts', {
      controller:'StatutsCtrl',
      templateUrl:'./statuts.html'
    })
    .when('/edit_project/:projectId', {
      controller:'EditProjectCtrl',
      templateUrl:'./edit_project.html' 
    })
    .when('/edit_event/:eventId', {
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

.controller('AccueilCtrl', function($scope, $http) {
	$http.get("./ajax/getProjects.php").success(function(data){
		$scope.projects = data;
	});
  $http.get("./ajax/getEvents.php").success(function(data){
    $scope.events = data;
  });
  $http.get("./ajax/getLocations.php").success(function(data){
    $scope.locations = data;
  });
  $http.get("./ajax/getCharacters.php").success(function(data){
    $scope.characters = data;
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
  
  //TO RETHINK AND REDO : add Element to project (passer d'abord l'élément, puis le projet : même controlleur ? ou un autre très différent : newEventforProject)
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

.controller('EditEventCtrl', function($scope, $routeParams, $http, $timeout) {
  var event_id = $routeParams.eventId;
  $http.get("./ajax/getProjects.php").success(function(data){
    $scope.projects = data;
  });
  $http.get("./ajax/getEventByID.php?event_id="+event_id).success(function(data){
    $scope.current_event = data;
    var project_id = $scope.current_event.project_id;
    $http.get("./ajax/getLocationsByProjectID.php?project_id="+project_id).success(function(data){
      $scope.locations = data;
    });
    $http.get("./ajax/getEventsByProjectID.php?project_id="+project_id).success(function(data){
      $scope.events = data;
    });
  });
  $http.get("./ajax/getChildrenEventsByID.php?event_id="+event_id).success(function(data){
    $scope.children_events = data;
  });

  
  //functions
  $scope.updateProject = function() {
    var id_project_selected = $('#select_project option:selected').val();
    if (! $.isNumeric(id_project_selected)) {
      id_project_selected = -1;
    }
    $http.get("./ajax/getLocationsByProjectID.php?project_id="+id_project_selected).success(function(data){
      $timeout(function() {
        $scope.locations = data;
      },0);
    });
    $http.get("./ajax/getEventsByProjectID.php?project_id="+id_project_selected).success(function(data){
      $timeout(function() {
        $scope.events = data;
      },0);
    });
  };
  $scope.removeSubEventFromEvent = function(id_child) {
    $http.get("./ajax/removeSubEventFromEvent.php?child_id="+id_child).success(function(data){
      $http.get("./ajax/getChildrenEventsByID.php?event_id="+event_id).success(function(data){
        $timeout(function() {
          $scope.children_events = data;
        },0);  
      });
    });
  };
  $scope.addSubEvent = function(id_event) {

  };
  $scope.removeCharacterFromEvent = function(id_event, id_character) {

  };
  $scope.addNewCharacterToEvent = function(id_event) {

  };
})



//TODO -->

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

