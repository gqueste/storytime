<?php

require_once './config.php';

if(isset($_POST['event_id'])){
	$event_id = $_POST['event_id'];
}


// on crée la requête SQL 
$query = 'UPDATE events SET parent_id = NULL WHERE events.parent_id = '.$event_id; 

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$json = array();

mysqli_close($mysqli);
echo json_encode($json);


?>