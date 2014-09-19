<?php

require_once './config.php';

if(isset($_POST['character_id'])){
	$character_id = $_POST['character_id'];
}
if(isset($_POST['name'])){
	$name = utf8_decode($_POST['name']);
}
if(isset($_POST['surname'])){
	$surname = utf8_decode($_POST['surname']);
}
if(isset($_POST['description'])){
	$description = utf8_decode($_POST['description']);
}
if(isset($_POST['mental'])){
	$mental = utf8_decode($_POST['mental']);
}

// on crée la requête SQL 
$query = "UPDATE locations set name ='".$name."' , surname ='".$surname."' , description ='".$description."' , mental ='".$mental."' where character_id =".$character_id;

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

?>