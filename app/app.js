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
    .when('/edit_location/:locationId', {
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
  $scope.projectSameAsInitial = true;
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
  $http.get("./ajax/getEventsNotChildrenYet.php?event_id="+event_id).success(function(data) {
    $scope.availableEventsToBeChildren = data;
  });
  $http.get("./ajax/getCharactersFromEvent.php?event_id="+event_id).success(function(data){
    $scope.event_characters = data;
  });
  $http.get("./ajax/getCharactersNotLinkedToEvent.php?event_id="+event_id).success(function(data) {
    $scope.availableCharacters = data;
  });

  //functions
  $scope.updateProject = function() {
    var id_project_selected = $('#select_project option:selected').val();
    var project_event;
    $http.get("./ajax/getEventByID.php?event_id="+event_id).success(function(data){
      $timeout(function() {
        project_event = data.project_id;
        if (id_project_selected != project_event && project_event != -1) {
          $scope.projectSameAsInitial = false;
          $('.retirerBtn').prop('disabled', true);
          $('.addElementBtn').prop('disabled', true);
        }
        else {
          $scope.projectSameAsInitial = true;
          $('.retirerBtn').prop('disabled', false);
          $('.addElementBtn').prop('disabled', false);
        }
      },0); 
    });
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
      $http.get("./ajax/getEventsNotChildrenYet.php?event_id="+event_id).success(function(data){
        $timeout(function() {
          $scope.availableEventsToBeChildren = data;
        },0);  
      });
    });
  };
  $scope.addSubEvent = function() {
    var id_child = $('#children_available_dropdown option:selected').val();
    $http.get("./ajax/addSubEventToEvent.php?child_id="+id_child+"&event_id="+event_id).success(function(data){
      $http.get("./ajax/getChildrenEventsByID.php?event_id="+event_id).success(function(data){
        $timeout(function() {
          $scope.children_events = data;
        },0);  
      });
      $http.get("./ajax/getEventsNotChildrenYet.php?event_id="+event_id).success(function(data){
        $timeout(function() {
          $scope.availableEventsToBeChildren = data;
        },0);  
      });  
    });
  };
  $scope.removeCharacterFromEvent = function(character_id) {
    $http.get("./ajax/removeCharacterFromEvent.php?event_id="+event_id+"&character_id="+character_id).success(function(data){
      $http.get("./ajax/getCharactersFromEvent.php?event_id="+event_id).success(function(data){
        $timeout(function() {
          $scope.event_characters = data;
        },0);  
      });
      $http.get("./ajax/getCharactersNotLinkedToEvent.php?event_id="+event_id).success(function(data) {
        $timeout(function() {
          $scope.availableCharacters = data;
        },0);  
      });
    });  
  };
  $scope.addCharacterToEvent = function() {
    var character_id = $('#characters_available_dropdown option:selected').val();
    $http.get("./ajax/addCharacterToEvent.php?character_id="+character_id+"&event_id="+event_id).success(function(data){
      $http.get("./ajax/getCharactersFromEvent.php?event_id="+event_id).success(function(data){
        $timeout(function() {
          $scope.event_characters = data;
        },0);  
      });
      $http.get("./ajax/getCharactersNotLinkedToEvent.php?event_id="+event_id).success(function(data) {
        $timeout(function() {
          $scope.availableCharacters = data;
        },0);  
      }); 
    });  
  };
})

.controller('EditLocationCtrl', function($scope, $routeParams, $http) {
  var location_id = $routeParams.locationId;
  $scope.projectSameAsInitial = true;
  $http.get("./ajax/getProjects.php").success(function(data){
    $scope.projects = data;
  });
  $http.get("./ajax/getLocationByID.php?location_id="+location_id).success(function(data){
    $scope.current_location = data;
    var project_id = $scope.current_location.project_id;
    $http.get("./ajax/getLocationsByProjectID.php?project_id="+project_id).success(function(data){
      $scope.locations = data;
    });
  });
  $http.get("./ajax/getChildrenLocationsByID.php?location_id="+location_id).success(function(data){
    $scope.children_locations = data;
  });
  $http.get("./ajax/getLocationsNotChildrenYet.php?location_id="+location_id).success(function(data) {
    $scope.availableLocationsToBeChildren = data;
  });
  $http.get("./ajax/getEventsFromLocation.php?location_id="+location_id).success(function(data){
    $scope.location_events = data;
  });
  $http.get("./ajax/getEventsNotLinkedToLocation.php?location_id="+location_id).success(function(data) {
    $scope.availableEvents = data;
  });

  //functions
  $scope.updateProject = function() {
  };
  $scope.saveChangesLocation = function() {
  };
  $scope.removeSublocationFromLocation = function(child_id) {
  };
  $scope.removeEventFromLocation = function(event_id) {
  };
  $scope.addSubLocation = function() {
  };
  $scope.addEventTolocation = function() {
  }

})


//TODO
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

