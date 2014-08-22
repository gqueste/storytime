<?php

require_once './config.php';


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
if(isset($_POST['element'])){
	$element = $_POST['element'];
}


// on crée la requête SQL 
$query = "INSERT INTO events (element_id, name, description, event_date, location_id, parent_id) VALUES(".$element.", '".$name."' , '".$description."' , '".$date."' , ".$location." , ".$parent.")";

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$id = $mysqli->insert_id;

mysqli_close($mysqli);
echo json_encode($id);

?>