<?php

require_once './config.php';

if(isset($_GET['project_id'])){
	$project_id = $_GET['project_id'];
}

if ($project_id == -1) {
	$query = "SELECT -1 id, '' name, '' summary, '' creation_date, 1 statut_id,'' statut, -1 parent_id, '' parent";
}
else {
	$query = 'SELECT project.project_id id, project.name, project.summary, project.creation_date, statuts.statut_id, statuts.name statut, parent.project_id parent_id, parent.name parent FROM projects project join statuts on statuts.statut_id = project.statut_id left outer join projects as parent on project.parent_id = parent.project_id where project.project_id = '.$project_id.' order by project.project_id'; 
}

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$json = array();
if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_assoc($result)){
        $json= array_map('utf8_encode', $row);
    }
}

mysqli_close($mysqli);
echo json_encode($json);


?>