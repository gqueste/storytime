<?php

require_once './config.php';

if(isset($_POST['character_id'])){
	$character_id = $_POST['character_id'];
}

// on crée la requête SQL 
$query = 'delete from events_characters where character_id = '.$character_id; 

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$json = array();

mysqli_close($mysqli);
echo json_encode($json);


?>