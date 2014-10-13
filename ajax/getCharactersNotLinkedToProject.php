<?php

require_once './config.php';

// on crée la requête SQL 
$query = " SELECT characters.character_id id, characters.name, characters.surname FROM characters";
$query .= " join elements on elements.element_id = characters.element_id";
$query .= " where elements.project_id IS NULL";


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