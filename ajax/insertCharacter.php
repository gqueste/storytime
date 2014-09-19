<?php

require_once './config.php';


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
if(isset($_POST['element'])){
	$element = $_POST['element'];
}


// on crée la requête SQL 
$query = "INSERT INTO characters (element_id, name, surname, description, mental) VALUES(".$element.", '".$name."' , '".$surname."' , '".$description."' ,'".$mental."' )";

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$id = $mysqli->insert_id;

mysqli_close($mysqli);
echo json_encode($id);

?>