<?php

require_once './config.php';


if(isset($_POST['name'])){
	$name = utf8_decode($_POST['name']);
}
if(isset($_POST['summary'])){
	$summary = utf8_decode($_POST['summary']);
}
if(isset($_POST['statut_id'])){
	$statut_id = $_POST['statut_id'];
}
if(isset($_POST['parent_id'])){
	$parent_id = $_POST['parent_id'];
	if($parent_id == -1) {
		$parent_id = 'NULL';
	}
}

// on crée la requête SQL 
$query = "INSERT INTO projects (name, summary, creation_date, statut_id, parent_id) VALUES('".$name."' , '".$summary."' , NOW() , ".$statut_id." , ".$parent_id.")";

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$id = $mysqli->insert_id;

mysqli_close($mysqli);
echo json_encode($id);

?>