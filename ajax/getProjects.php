<?php

require_once './config.php';

// on crée la requête SQL 
$query = 'SELECT project.project_id id, project.name, project.summary, project.creation_date, statuts.name statut, parent.name parent FROM projects project join statuts on statuts.statut_id = project.statut_id left outer join projects as parent on project.parent_id = parent.project_id order by project.project_id'; 

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$arr = array();
if($result->num_rows > 0) {
 while($obj = mysqli_fetch_assoc($result)) {
 $arr[] = $obj;
 }
}
 
echo $json_response = json_encode($arr);
?>