<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$servername = "localhost";
$username = "root";
$password = "welcome";
$dbname = "db02";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


$sql = "SELECT * FROM webixTable ORDER BY id DESC";
$result = $conn->query($sql);


$outp = array();
while($rs = $result->fetch_assoc()) {
   //$var = array();
   $outp[] = $rs ;
}
$conn->close();

$data = json_encode($outp);
echo $data ; 




