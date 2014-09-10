<?php

require_once './config.php';

if(isset($_GET['event_id'])){
	$event_id = $_GET['event_id'];
}

// on crée la requête SQL 
$query = " SELECT characters.character_id id, characters.name, characters.surname FROM characters";
$query .= " join elements on elements.element_id = characters.character_id";
$query .= " where characters.character_id NOT IN (";
$query .= "     Select character_id";
$query .= "     from events_characters";
$query .= "     WHERE event_id = ".$event_id.")";
$query .= " and elements.project_id IN (";
$query .= "     select elements.project_id";
$query .= "     from elements";
$query .= "     join events on events.element_id = elements.element_id";
$query .= "     where events.event_id = ".$event_id.") ";


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