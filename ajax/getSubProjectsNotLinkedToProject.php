<?php

require_once './config.php';

if(isset($_GET['project_id'])){
	$project_id = $_GET['project_id'];
}

// on crée la requête SQL 
$query = " SELECT projects.project_id id, projects.name FROM projects";
$query .= " where projects.parent_id IS NULL and projects.project_id <> ".$project_id;

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