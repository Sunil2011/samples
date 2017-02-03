<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$params = $_POST ;

$id = isset($params['id']) ? $params['id'] : 0 ;
$date = $params['date'];
$employee = $params['employee'];
$project = $params['project'];
$task = $params['task'] ;
$activity = $params['activity'] ;
$hr = $params['hr'] ;

$dt = new DateTime($params['date']);
$week_no = $dt->format("W");

date_default_timezone_set("Asia/Kolkata");
$created_at = date("Y-m-d H:i:s");

//var_dump($params,$week_no,$created_at); exit;

// Create connection

$servername = "localhost";
$username = "root";
$password = "welcome";
$dbname = "db02";
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}


if (!$id) {
    
    $sql = "INSERT INTO webixTable (date, employee, project, task, activity, hr, week_no, created_at) VALUES ('$date', '$employee', '$project', '$task', '$activity', '$hr', '$week_no', '$created_at')";
    if ($conn->query($sql) === TRUE) {
        $last_id = $conn->insert_id;
      
       // get last inserted row
        $sql = "SELECT * FROM webixTable WHERE id='$last_id'";
        $result = $conn->query($sql);
        $outp = array();
        while ($rs = $result->fetch_assoc()) {
          //$var = array();
           $outp[] = $rs;
        }      
               
        $data = array(
            "success" => true,
            "msg" => "New record created successfully",
            "id" => $last_id,
            "insData" => $outp                 
        );
        $jdata = json_encode($data);
        echo $jdata;
        
    } else {
        //echo "Error: " . $sql . "<br>" . $conn->error;
        $erdata = array(
            "success" => false,
            "msg" => "Error: " . $sql . "<br>" . $conn->error,
        );
        $jdata = json_encode($erdata);
        echo $jdata ;
    }
} else {
    $sql = "UPDATE webixTable SET date='$date', project='$project', task='$task', activity='$activity', hr='$hr', week_no='$week_no' WHERE id='$id'";
    
    $last_id = $id;
    
    if ($conn->query($sql) === TRUE) {
        
        // get updated row
        $sql = "SELECT * FROM webixTable WHERE id='$last_id'";
        $result = $conn->query($sql);
        $outp = array();
        while ($rs = $result->fetch_assoc()) {          
           $outp[] = $rs;
        }
        
        $data = array(
            "success" => true,
            "msg" => " Data updated successfully",
            "id" => $last_id,
            "insData" => $outp
        );
        $jdata = json_encode($data);
        echo $jdata;
        
    } else {
        //echo "Error: " . $sql . "<br>" . $conn->error;
        $erdata = array(
            "success" => false,
            "msg" => "Error: " . $sql . "<br>" . $conn->error,
        );
        $jdata = json_encode($erdata);
        echo $jdata ;
    }
    
}

function getLastInsetedRow($Id)
{
   
}

$conn->close();
