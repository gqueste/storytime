<?php

require_once './config.php';

if(isset($_GET['location_id'])){
	$location_id = $_GET['location_id'];
}

// on crée la requête SQL 
$query = " select locations.location_id id, locations.name name ";
$query .= " from locations ";
$query .= " join elements on elements.element_id = locations.element_id ";
$query .= " where elements.project_id IN (";
$query .= "		Select elements.project_id";
$query .= "		from elements";
$query .= "		join locations on locations.element_id = elements.element_id";
$query .= "		where locations.location_id = ".$location_id.")"; 
$query .= " and locations.location_id <> ".$location_id;
$query .= " and locations.parent_id is null";


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