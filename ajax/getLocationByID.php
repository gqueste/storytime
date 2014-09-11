<?php

require_once './config.php';

if(isset($_GET['location_id'])){
	$location_id = $_GET['location_id'];
}

if ($location_id == -1) {
	$query = "select -1 id, '' name, '' description, -1 parent_id, '' parent_name, -1 element_id, -1 project_id, '' project_name";
}
else{
	// on crée la requête SQL 
	$query = "select locations.location_id id, locations.name name, locations.description description, parent.location_id parent_id, parent.name parent_name, elements.element_id element_id, projects.project_id project_id, projects.name project_name ";
	$query .= "from locations ";
	$query .= "join elements on elements.element_id = locations.element_id ";
	$query .= "join projects on projects.project_id = elements.project_id ";
	$query .= "LEFT OUTER JOIN EVENTS AS parent ON locations.parent_id = parent.location_id ";
	$query .= "where locations.location_id = ".$location_id; 
}



// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$json = array();
if(mysqli_num_rows($result)){
    while($row=mysqli_fetch_assoc($result)){
        $json= array_map('utf8_encode', $row);
    }
}

mysqli_close($mysqli);
echo json_encode($json);


?>