<?php

require_once './config.php';

if(isset($_POST['event_id'])){
	$event_id = $_POST['event_id'];
}
if(isset($_POST['name'])){
	$name = utf8_decode($_POST['name']);
}
if(isset($_POST['description'])){
	$description = utf8_decode($_POST['description']);
}
if(isset($_POST['date'])){
	$date = utf8_decode($_POST['date']);
}
if(isset($_POST['location'])){
	$location = $_POST['location'];
	if($location == -1) {
		$location = 'NULL';
	}
}
if(isset($_POST['parent'])){
	$parent = $_POST['parent'];
	if($parent == -1) {
		$parent = 'NULL';
	}
}

// on crée la requête SQL 
$query = "UPDATE events set name ='".$name."' , description ='".$description."' , event_date ='".$date."' , location_id =".$location.", parent_id = ".$parent." where event_id =".$event_id;

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

?>