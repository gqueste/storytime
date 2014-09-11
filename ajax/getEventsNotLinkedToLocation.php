<?php

require_once './config.php';

if(isset($_GET['location_id'])){
	$location_id = $_GET['location_id'];
}

// on crée la requête SQL 
$query = " SELECT events.event_id id, events.name FROM events";
$query .= " join elements on elements.element_id = events.element_id";
$query .= " where events.location_id IS NULL ";
$query .= " and elements.project_id IN (";
$query .= "     select elements.project_id";
$query .= "     from elements";
$query .= "     join locations on locations.element_id = elements.element_id";
$query .= "     where locations.location_id = ".$location_id.") ";


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