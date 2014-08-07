<?php

require_once './config.php';

if(isset($_POST['project'])){
	$project_id = $_POST['project'];
}
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
$query = "UPDATE projects set name ='".$name."' , summary ='".$summary."' , statut_id =".$statut_id." , parent_id =".$parent_id." where project_id =".$project_id;

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

?>