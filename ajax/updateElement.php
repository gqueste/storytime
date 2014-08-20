<?php

require_once './config.php';

if(isset($_POST['project'])){
	$project_id = $_POST['project'];
	if($project_id == -1) {
		$project_id = 'NULL';
	}
}
if(isset($_POST['element'])){
	$element = $_POST['element'];
}

// on crée la requête SQL 
$query = "UPDATE elements set project_id =".$project_id." , modification_date = NOW() where element_id =".$element;

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

?>