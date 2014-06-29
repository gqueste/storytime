<?php

require_once './config.php';

// on crée la requête SQL 
$query = 'SELECT project.name, project.summary, project.creation_date, statuts.name statut, parent.name parent FROM `projects` project
join statuts on statuts.statut_id = project.statut_id
left outer join projects as parent on project.project_id = parent.project_id'; 

// on envoie la requête 
$req = mysql_query($query) or die('Erreur SQL !<br> getProjects() <br>'.mysql_error());
 
$arr = array();
if(mysql_num_rows($req) > 0) {
 while($row = mysql_fetch_assoc($req)) {
 $arr[] = $row;
 }
}
 
# JSON-encode the response
echo $json_response = json_encode($arr);
?>