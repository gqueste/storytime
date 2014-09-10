<?php

require_once './config.php';

if(isset($_GET['event_id'])){
	$event_id = $_GET['event_id'];
}

// on crée la requête SQL 
$query = " select characters.character_id id, characters.name name, characters.surname, characters.description, characters.mental ";
$query .= " from characters ";
$query .= " join events_characters on events_characters.character_id = characters.character_id";
$query .= " where events_characters.event_id = ".$event_id; 


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