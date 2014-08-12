//<![CDATA[

function removeChildrenFromProject(element){
	var id_parent = $('#hidden_id_project').val();
	var array_child = element.id.split('-');
	var id_child = array_child[array_child.length-1];
	$.ajax({
		type: "POST",
		url: "./ajax/removeChildrenFromProject.php",
		data: { project: id_child}
	})
	.done(function() {
		location.reload();
	});
}

function saveChangesProject(){
	var id_project = $('#hidden_id_project').val();
	var name = $('#text_name_project').val();
	var summary = $('#textarea_summary').val();
	var statut_id = $('#select_statut').val();
	var parent = $('#parent_dropdown option:selected').attr('id');
	var parent_id = 0;
	if(parent == 'parent-null') {
		parent_id = -1;
	}
	else {
		var array_parent = parent.split('-');
		parent_id = array_parent[array_parent.length-1];
	}
	
	$.ajax({
		type: "POST",
		url: "./ajax/updateProject.php",
		data: { project: id_project, name: name, summary: summary, statut_id: statut_id, parent_id: parent_id},
		success : function() {
			location.reload();
		}
	});
}

function removeElementFromProject(element){
	var id_project = $('#hidden_id_project').val();
	var array_element = element.id.split('-');
	var id_element = array_element[array_element.length-1];
	$.ajax({
		type: "POST",
		url: "./ajax/removeElementFromProject.php",
		data: {element: id_element},
		success : function() {
			location.reload();
		} 
	});
}

//]]>