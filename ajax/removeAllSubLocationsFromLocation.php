<?php

require_once './config.php';

if(isset($_POST['location_id'])){
	$location_id = $_POST['location_id'];
}


// on crée la requête SQL 
$query = 'UPDATE locations SET parent_id = NULL WHERE locations.parent_id = '.$location_id; 

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$json = array();

mysqli_close($mysqli);
echo json_encode($json);


?>