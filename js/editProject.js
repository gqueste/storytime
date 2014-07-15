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
		alert( "Projet retiré");
		location.reload();
	});
}

function saveChangesProject(){
	var id_project = $('#hidden_id_project').val();
	var name = $('#text_name_project').val();
	var summary = $('#textarea_summary').val();
	var statut_id = $('#select_statut').val();
	
	/*$.ajax({
		type: "POST",
		url: "./ajax/updateProject.php",
		data: { project: id_project, name: , summary: , statut_id: , parent_id: }
	})
	.done(function() {
		alert( "Projet retiré");
		location.reload();
	});*/
}
//]]>