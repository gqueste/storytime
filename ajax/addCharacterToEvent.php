<?php

require_once './config.php';

if(isset($_GET['character_id'])){
	$character_id = $_GET['character_id'];
}
if(isset($_GET['event_id'])){
	$event_id = $_GET['event_id'];
}


// on crée la requête SQL 
$query = 'INSERT INTO events_characters values ('.$event_id.','.$character_id.')'; 

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$json = array();

mysqli_close($mysqli);
echo json_encode($json);


?>