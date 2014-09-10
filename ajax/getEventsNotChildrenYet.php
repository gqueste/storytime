<?php

require_once './config.php';

if(isset($_GET['event_id'])){
	$event_id = $_GET['event_id'];
}

// on crée la requête SQL 
$query = " select events.event_id id, events.name name ";
$query .= " from events ";
$query .= " join elements on elements.element_id = events.element_id ";
$query .= " where elements.project_id IN (";
$query .= "		Select elements.project_id";
$query .= "		from elements";
$query .= "		join events on events.element_id = elements.element_id";
$query .= "		where events.event_id = ".$event_id.")"; 
$query .= " and events.event_id <> ".$event_id;
$query .= " and events.parent_id is null";


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