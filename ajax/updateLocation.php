<?php

require_once './config.php';

if(isset($_POST['location_id'])){
	$location_id = $_POST['location_id'];
}
if(isset($_POST['name'])){
	$name = utf8_decode($_POST['name']);
}
if(isset($_POST['description'])){
	$description = utf8_decode($_POST['description']);
}
if(isset($_POST['parent'])){
	$parent = $_POST['parent'];
	if($parent == -1) {
		$parent = 'NULL';
	}
}

// on crée la requête SQL 
$query = "UPDATE locations set name ='".$name."' , description ='".$description."' , parent_id = ".$parent." where location_id =".$location_id;
echo "lol";

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

?>