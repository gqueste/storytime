//<![CDATA[
function saveChangesEvent() {
	var id_event = $('#hidden_id_event').val();
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
	
}

//]]>