<?php

require_once './config.php';

if(isset($_GET['child_id'])){
	$child_id = $_GET['child_id'];
}


// on crée la requête SQL 
$query = 'UPDATE locations SET parent_id = NULL WHERE locations.location_id = '.$child_id; 

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$json = array();

mysqli_close($mysqli);
echo json_encode($json);


?>