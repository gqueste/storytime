<?php

require_once './config.php';

if(isset($_GET['character_id'])){
	$character_id = $_GET['character_id'];
}

// on crée la requête SQL 
$query = " select events.event_id id, events.name name, events.description description, events.event_date date, locations.name location_name, parent.event_id parent_id, parent.name parent_name ";
$query .= " from events ";
$query .= " LEFT OUTER JOIN EVENTS AS parent ON events.parent_id = parent.event_id ";
$query .= " left outer join locations on events.location_id = locations.location_id";
$query .= " join events_characters on events.event_id = events_characters.event_id ";
$query .= " where events_characters.character_id = ".$character_id; 


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