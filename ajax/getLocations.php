<?php

require_once './config.php';


// on crée la requête SQL 
$query = "select locations.location_id id, locations.name name, locations.description description, parent.location_id parent_id, parent.name parent_name, elements.element_id, projects.project_id, projects.name project_name ";
$query .= "from locations ";
$query .= "join elements on elements.element_id = locations.element_id ";
$query .= "left outer join projects on projects.project_id = elements.project_id ";
$query .= "LEFT OUTER JOIN locations AS parent ON locations.parent_id = parent.location_id "; 
$query .= " ORDER BY projects.name "; 

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