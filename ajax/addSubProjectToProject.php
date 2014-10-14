<?php

require_once './config.php';

if(isset($_POST['project'])){
	$project = $_POST['project'];
}
if(isset($_POST['child'])){
	$child = $_POST['child'];
}


// on crée la requête SQL 
$query = 'UPDATE projects SET parent_id = '.$project.' where project_id = '.$child; 

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$json = array();

mysqli_close($mysqli);
echo json_encode($json);


?>