<?php

require_once './config.php';


if(isset($_POST['project'])){
	$project = $_POST['project'];
	if($project == -1) {
		$project = 'NULL';
	}
}

// on crée la requête SQL 
$query = "INSERT INTO elements (project_id, creation_date, modification_date) VALUES(".$project." , NOW() , NOW() )";

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$id = $mysqli->insert_id;

mysqli_close($mysqli);
echo json_encode($id);

?>