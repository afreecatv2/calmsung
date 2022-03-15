<?php
//ini_set('display_errors', '0');

//    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    
	$data = array
	(
		explode(PHP_EOL,$intro),
		explode(PHP_EOL,$bj)	
	);
    $name = 'aengji';
	$json = json_encode($data);
	$pwd2 = $_POST["password"];
    
	require_once('../includes/dbconnect.php');
	require_once('../includes/pwd.php');
	
	if($pwd == $pwd2){
	
		$stmt = $conn->prepare("UPDATE `afreecatv` SET json = (?) WHERE name= (?)");
		$stmt->bind_param("ss", $json, $name);
		try {
			$result = $stmt->execute();
			echo $result;
		}
		catch (\PDOException $e) {
			echo 0;
		}
	}else{
		echo 'pwd_error';
	}
?>