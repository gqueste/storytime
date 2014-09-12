angular.module('Storytime', ['ngRoute'], function($httpProvider){
  //Code from zeke : http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/
  // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 
  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for(name in obj) {
      value = obj[name];
        
      if(value instanceof Array) {
        for(i=0; i<value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value instanceof Object) {
        for(subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += param(innerObj) + '&';
        }
      }
      else if(value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
  };
 
  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
  }];
})

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
    .when('/edit_character/:characterId', {
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
  $scope.saveChangesEvent = function() {
    var id_element = $scope.current_event.element_id;
    var name = $('#text_name_event').val();
    var description = $('#textarea_description').val();
    var date = $('#text_date_event').val();
    var project = $('#select_project option:selected').val();
    if(! $.isNumeric(project)) {
      project = -1;
    }
    var location = $('#select_location option:selected').val();
    if(! $.isNumeric(location)) {
      location = -1;
    }
    var parent = $('#parent_dropdown option:selected').val();
    if(! $.isNumeric(parent)) {
      parent = -1;
    }

    if(event_id == -1) {
      //create event
      $http.post("./ajax/insertElement.php", {project: project}).success(function(data){
        var elementCreated = data;
        $http.post("./ajax/insertEvent.php", { element: elementCreated, name: name, description: description, date: date, location: location, parent: parent}).success(function(data){  
          window.location.replace("#/edit_event/"+data);
        });
      });
    }
    else {
      $http.get("./ajax/getEventByID.php?event_id="+event_id).success(function(data){
        var previous_event = data;
        if(project != previous_event.project_id) {
          $http.post("./ajax/removeAllSubEventsFromEvent.php", { event_id: event_id}).success(function(data){
            $http.post("./ajax/removeAllCharactersFromEvent.php", { event_id: event_id}).success(function(data){
              $http.post("./ajax/updateElement.php", { element: id_element, project: project}).success(function(data){
                $http.post("./ajax/updateEvent.php", { event_id: event_id, name: name, description: description, date: date, location: location, parent: parent}).success(function(data){
                  window.location.reload();
                });  
              });  
            });  
          });
        }
        else {
          $http.post("./ajax/updateEvent.php", { event_id: event_id, name: name, description: description, date: date, location: location, parent: parent}).success(function(data){
            window.location.reload();
          });  
        }
      });
    }
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
    var id_project_selected = $('#select_project option:selected').val();
    var project_location;
    $http.get("./ajax/getLocationByID.php?location_id="+location_id).success(function(data){
      project_location = data.project_id;
      if (id_project_selected != project_location && project_location != -1) {
        $scope.projectSameAsInitial = false;
        $('.retirerBtn').prop('disabled', true);
        $('.addElementBtn').prop('disabled', true);
      }
      else {
        $scope.projectSameAsInitial = true;
        $('.retirerBtn').prop('disabled', false);
        $('.addElementBtn').prop('disabled', false);
      }
    });
    if (! $.isNumeric(id_project_selected)) {
      id_project_selected = -1;
    }
    $http.get("./ajax/getLocationsByProjectID.php?project_id="+id_project_selected).success(function(data){
      
        $scope.locations = data;
      
    });
  };
  $scope.saveChangesLocation = function() {
    var id_element = $scope.current_location.element_id;
    var name = $('#text_name_location').val();
    var description = $('#textarea_description').val();
    var project = $('#select_project option:selected').val();
    if(! $.isNumeric(project)) {
      project = -1;
    }
    var parent = $('#parent_dropdown option:selected').val();
    if(! $.isNumeric(parent)) {
      parent = -1;
    }

    if(location_id == -1) {
      //create location
      $http.post("./ajax/insertElement.php", {project: project}).success(function(data){
        var elementCreated = data;
        $http.post("./ajax/insertLocation.php", { element: elementCreated, name: name, description: description, parent: parent}).success(function(data){
          window.location.replace("#/edit_location/"+data);
        });  
      });   
    }
    else {
      //edit location
      $http.get("./ajax/getLocationByID.php?location_id="+location_id).success(function(data) {
        var previous_location = data;
        if(project != previous_location.project_id) {
          $http.post("./ajax/removeAllSubLocationsFromLocation.php", { location_id: location_id}).success(function(data) {
            $http.post("./ajax/removeAllEventsFromLocation.php", { location_id: location_id}).success(function(data) {
              $http.post("./ajax/updateElement.php", { element: id_element, project: project}).success(function(data) {
                $http.post("./ajax/updateLocation.php", { location_id: location_id, name: name, description: description, parent: parent}).success(function(data) {
                  window.location.reload();    
                });
              });
            });
          });
        }
        else {
          $http.post("./ajax/updateLocation.php", { location_id: location_id, name: name, description: description, parent: parent}).success(function(data) {
            window.location.reload();    
          });
        }  
      });
    }
  };
  $scope.removeSublocationFromLocation = function(child_id) {
    $http.get("./ajax/removeSubLocationFromLocation.php?child_id="+child_id).success(function(data){
      $http.get("./ajax/getChildrenLocationsByID.php?location_id="+location_id).success(function(data){
        $scope.children_locations = data;
      });
      $http.get("./ajax/getLocationsNotChildrenYet.php?location_id="+location_id).success(function(data){
        $scope.availableLocationsToBeChildren = data;
      });
    });  
  };
  $scope.addSubLocation = function() {
    var id_child = $('#children_available_dropdown option:selected').val();
    $http.get("./ajax/addSubLocationToLocation.php?child_id="+id_child+"&location_id="+location_id).success(function(data){
      $http.get("./ajax/getChildrenLocationsByID.php?location_id="+location_id).success(function(data){
        $scope.children_locations = data;
      });
      $http.get("./ajax/getLocationsNotChildrenYet.php?location_id="+location_id).success(function(data){
        $scope.availableLocationsToBeChildren = data;
      });  
    });
  };
  $scope.removeEventFromLocation = function(event_id) {
    $http.get("./ajax/removeEventFromLocation.php?location_id="+location_id+"&event_id="+event_id).success(function(data){
      $http.get("./ajax/getEventsFromLocation.php?location_id="+location_id).success(function(data){
        $scope.location_events = data;
      });
      $http.get("./ajax/getEventsNotLinkedToLocation.php?location_id="+location_id).success(function(data) {
        $scope.availableEvents = data;
      });
    });
  };
  $scope.addEventToLocation = function() {
    var event_id = $('#events_available_dropdown option:selected').val();
    $http.get("./ajax/addEventToLocation.php?event_id="+event_id+"&location_id="+location_id).success(function(data){
      $http.get("./ajax/getEventsFromLocation.php?location_id="+location_id).success(function(data){
        $scope.location_events = data;
      });
      $http.get("./ajax/getEventsNotLinkedToLocation.php?location_id="+location_id).success(function(data) {
        $scope.availableEvents = data;
      }); 
    });
  }
})


.controller('EditCharacterCtrl', function($scope, $routeParams, $http) {
  var character_id = $routeParams.characterId;
  $scope.projectSameAsInitial = true;
  $http.get("./ajax/getProjects.php").success(function(data){
    $scope.projects = data;
  });
  $http.get("./ajax/getCharacterByID.php?character_id="+character_id).success(function(data){
    $scope.current_character = data;
  });
  $http.get("./ajax/getEventsFromCharacter.php?character_id="+character_id).success(function(data){
    $scope.character_events = data;
  });
  $http.get("./ajax/getEventsNotLinkedToCharacter.php?character_id="+character_id).success(function(data) {
    $scope.availableEvents = data;
  });

  //functions
  $scope.updateProject = function() {
    var id_project_selected = $('#select_project option:selected').val();
    var project_character;
    $http.get("./ajax/getCharacterByID.php?character_id="+character_id).success(function(data){
      project_character = data.project_id;
      if (id_project_selected != project_character && project_character != -1) {
        $scope.projectSameAsInitial = false;
        $('.retirerBtn').prop('disabled', true);
        $('.addElementBtn').prop('disabled', true);
      }
      else {
        $scope.projectSameAsInitial = true;
        $('.retirerBtn').prop('disabled', false);
        $('.addElementBtn').prop('disabled', false);
      }
    });
    if (! $.isNumeric(id_project_selected)) {
      id_project_selected = -1;
    }
  };
  $scope.saveChangesCharacter = function() {
    var id_element = $scope.current_character.element_id;
    var name = $('#text_name_character').val();
    var surname = $('#text_surname_character').val();
    var description = $('#textarea_description').val();
    var mental = $('#textarea_mental').val();
    var project = $('#select_project option:selected').val();
    if(! $.isNumeric(project)) {
      project = -1;
    }

    if(character_id == -1) {
      //create character
      $http.post("./ajax/insertElement.php", {project: project}).success(function(data){
        var elementCreated = data;
        $http.post("./ajax/insertCharacter.php", { element: elementCreated, name: name, surname: surname, description: description, mental: mental}).success(function(data){
          window.character.replace("#/edit_character/"+data);
        });  
      });   
    }
    else {
      //edit character
      $http.get("./ajax/getCharacterByID.php?character_id="+character_id).success(function(data) {
        var previous_character = data;
        if(project != previous_character.project_id) {
          $http.post("./ajax/removeAllEventsFromCharacter.php", { character_id: character_id}).success(function(data) {
            $http.post("./ajax/updateElement.php", { element: id_element, project: project}).success(function(data) {
              $http.post("./ajax/updatecharacter.php", { character_id: character_id, element: elementCreated, name: name, surname: surname, description: description, mental: mental}).success(function(data) {
                window.character.reload();    
              });
            });
          });
        }
        else {
          $http.post("./ajax/updatecharacter.php", { character_id: character_id, element: elementCreated, name: name, surname: surname, description: description, mental: mental}).success(function(data) {
            window.character.reload();    
          });
        }  
      });
    }
  };
  $scope.removeEventFromCharacter = function(event_id) {
    $http.get("./ajax/removeEventFromCharacter.php?character_id="+character_id+"&event_id="+event_id).success(function(data){
      $http.get("./ajax/getEventsFromCharacter.php?character_id="+character_id).success(function(data){
        $scope.character_events = data;
      });
      $http.get("./ajax/getEventsNotLinkedToCharacter.php?character_id="+character_id).success(function(data) {
        $scope.availableEvents = data;
      });
    });
  };
  $scope.addEventToCharacter = function() {
    var event_id = $('#events_available_dropdown option:selected').val();
    $http.get("./ajax/addEventToCharacter.php?event_id="+event_id+"&character_id="+character_id).success(function(data){
      $http.get("./ajax/getEventsFromCharacter.php?character_id="+character_id).success(function(data){
        $scope.character_events = data;
      });
      $http.get("./ajax/getEventsNotLinkedToCharacter.php?character_id="+character_id).success(function(data) {
        $scope.availableEvents = data;
      }); 
    });
  }  
});

