<?php

require_once './config.php';

// on crée la requête SQL 
$query = "select characters.character_id id, characters.name name, characters.surname, characters.description description, characters.mental, elements.element_id, projects.project_id, projects.name project_name ";
$query .= "from characters ";
$query .= "join elements on elements.element_id = characters.element_id ";
$query .= "left outer join projects on projects.project_id = elements.project_id ";
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