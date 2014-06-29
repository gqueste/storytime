<?php

require_once './config.php';

// on crée la requête SQL 
$query = 'SELECT * FROM statuts'; 

// on envoie la requête 
$req = mysql_query($query) or die('Erreur SQL !<br> getStatuts() <br>'.mysql_error());
 
$arr = array();
if(mysql_num_rows($req) > 0) {
 while($row = mysql_fetch_assoc($req)) {
 $arr[] = $row;
 }
}
 
# JSON-encode the response
echo $json_response = json_encode($arr);
?>