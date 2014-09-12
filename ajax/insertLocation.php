<?php

require_once './config.php';


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
if(isset($_POST['element'])){
	$element = $_POST['element'];
}


// on crée la requête SQL 
$query = "INSERT INTO locations (element_id, name, description, parent_id) VALUES(".$element.", '".$name."' , '".$description."' , ".$parent.")";

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$id = $mysqli->insert_id;

mysqli_close($mysqli);
echo json_encode($id);

?>