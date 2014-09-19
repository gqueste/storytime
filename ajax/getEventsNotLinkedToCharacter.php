<?php

require_once './config.php';

if(isset($_GET['character_id'])){
	$character_id = $_GET['character_id'];
}

// on crée la requête SQL 
$query = " SELECT events.event_id id, events.name FROM events";
$query .= " join elements on elements.element_id = events.element_id";
$query .= " where events.event_id not in ( ";
$query .= " 	select event_id";
$query .= "		from events_characters";
$query .= "		where character_id = ".$character_id.")";
$query .= " and elements.project_id IN (";
$query .= "     select elements.project_id";
$query .= "     from elements";
$query .= "     join characters on characters.element_id = elements.element_id";
$query .= "     where characters.character_id = ".$character_id.") ";


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