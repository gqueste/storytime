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
//]]>