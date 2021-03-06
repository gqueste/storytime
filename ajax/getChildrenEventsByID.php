<?php

require_once './config.php';

if(isset($_GET['event_id'])){
	$event_id = $_GET['event_id'];
}

// on crée la requête SQL 
$query = "select events.event_id id, events.name name, events.description description, events.event_date date, events.location_id location_id, parent.event_id parent_id, parent.name parent_name, elements.element_id element_id, projects.project_id project_id, projects.name project_name ";
$query .= "from events ";
$query .= "join elements on elements.element_id = events.element_id ";
$query .= "left outer join projects on projects.project_id = elements.project_id ";
$query .= "LEFT OUTER JOIN EVENTS AS parent ON events.parent_id = parent.event_id ";
$query .= "where events.parent_id = ".$event_id; 


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