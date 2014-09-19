<?php

require_once './config.php';

if(isset($_GET['character_id'])){
	$character_id = $_GET['character_id'];
}

if ($character_id == -1) {
	$query = "select -1 id, '' name, '' surname, '' description, '' mental, -1 element_id, -1 project_id, '' project_name";
}
else{
	// on crée la requête SQL 
	$query = "select characters.character_id id, characters.name name, characters.surname surname, characters.description description, characters.mental mental, elements.element_id element_id, projects.project_id project_id, projects.name project_name ";
	$query .= "from characters ";
	$query .= "join elements on elements.element_id = characters.element_id ";
	$query .= "join projects on projects.project_id = elements.project_id ";
	$query .= "where characters.character_id = ".$character_id; 
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