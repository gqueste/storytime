//<![CDATA[
function saveChangesEvent() {
	var id_event = $('#hidden_id_event').val();
	var id_element = $('#hidden_id_element').val();
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

	if(id_event == -1) {
		//create event
		$.ajax({
			type: "POST",
			url: "./ajax/insertElement.php",
			data: {project: project},
			success : function(data) {
				var elementCreated = data;
				$.ajax({
					type: "POST",
					url: "./ajax/insertEvent.php",
					data: { element: elementCreated, name: name, description: description, date: date, location: location, parent: parent},
					success : function(data) {						
						window.location.replace("#/edit_event/"+data);
					}
				});				
			}
		});

		
	}
	else {
		//edit event
		$.ajax({
			type: "POST",
			url: "./ajax/updateElement.php",
			data: { element: id_element, project: project},
			success : function() {
				$.ajax({
					type: "POST",
					url: "./ajax/updateEvent.php",
					data: { event_id: id_event, name: name, description: description, date: date, location: location, parent: parent},
					success : function() {
						alert(description);
						window.location.reload();
					},
					error : function() {
						alert('Problème lors de MAJ de Event');	
					}
				});
			},
			error : function() {
				alert('Problème lors de MAJ de Element');	
			}
		});

		
	}
}

//]]>