<?php

require_once './config.php';

if(isset($_GET['project_id'])){
	$project_id = $_GET['project_id'];
}

// on crée la requête SQL 
$query = 'SELECT parent.project_id id, parent.name name, parent.summary, parent.creation_date, statuts.name statut FROM projects parent join projects as fils on fils.parent_id = parent.project_id
join statuts on statuts.statut_id = parent.statut_id WHERE fils.project_id = '.$project_id; 

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$json = array();
if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_assoc($result)){
        $json[]= array_map('utf8_encode', $row);
    }
}

mysqli_close($mysqli);
echo json_encode($json);

?>