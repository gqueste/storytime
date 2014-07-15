<?php

require_once './config.php';

if(isset($_POST['project'])){
	$project_id = $_POST['project'];
}

// on crée la requête SQL 
$query = 'UPDATE projects SET parent_id = NULL WHERE projects.project_id = '.$project_id; 

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$json = array();

mysqli_close($mysqli);
echo json_encode($json);


?>