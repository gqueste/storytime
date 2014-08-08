<?php

require_once './config.php';

if(isset($_POST['element'])){
	$element_id = $_POST['element'];
}

// on crée la requête SQL 
$query = 'UPDATE elements SET project_id = NULL WHERE elements.element_id = '.$element_id; 

// on envoie la requête 
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$json = array();

mysqli_close($mysqli);
echo json_encode($json);


?>