<?php 
error_reporting(-1);

if ( !empty($_POST) )
{
	// debug
	// var_dump( $_POST );

	$name = $_POST['name'];

	$servername = "localhost";
	$username = "";
	$password = "";
	$dbname = "nfl_bracket";

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) 
	{
	    die("Connection failed: " . $conn->connect_error);
	} 


	if ( !empty($_POST['player_id']) )
	{
		$player_id = $_POST['player_id'];
		$sql = "UPDATE brackets SET afc_1_1 = '".$_POST["afc1_1"]."', afc_1_2 = '".$_POST["afc1_2"]."', afc_2_1 = '".$_POST["afc2_1"]."', afc_2_2 = '".$_POST["afc2_2"]."', afc_champ = '".$_POST["afc3"]."', nfc_1_1 = '".$_POST["nfc1_1"]."', nfc_1_2 = '".$_POST["nfc1_2"]."', nfc_2_1 = '".$_POST["nfc2_1"]."', nfc_2_2 = '".$_POST["nfc2_2"]."', nfc_champ = '".$_POST["nfc3"]."', superbowl_champ = '".$_POST["superbowl"]."', score = '".$_POST["score"]."', superbowl_mvp = '".$_POST["mvp"]."' WHERE player_id = $player_id";
		var_dump( $sql );
		if ($conn->query($sql) === TRUE) 
		{	
    		$conn->close();
			header('Location: http://noahgrubb.com/bracket-challenge/?update=true');
    	}
    	else
    	{
    		echo 'error updating bracket';
    	}
	}
	else
	{

		$sql = "SELECT player_id FROM players WHERE name = '$name'";
		$result = $conn->query($sql);
		if ( $result->num_rows > 0 ) 
		{
			echo 'user already exists';
			$conn->close();
			// header('index.php?duplicate=true');
		}
		else
		{
			// create player
			$sql = "INSERT INTO players (name, score, paid) VALUES ('$name', 0, 0)";
			if ($conn->query($sql) === TRUE) 
			{
				$player_id = $conn->insert_id;
				$sql = "INSERT INTO brackets (player_id, afc_1_1, afc_1_2, afc_2_1, afc_2_2, afc_champ, nfc_1_1, nfc_1_2, nfc_2_1, nfc_2_2, nfc_champ, superbowl_champ, score, superbowl_mvp) VALUES ('".$player_id."', '".$_POST["afc1_1"]."','".$_POST["afc1_2"]."','".$_POST["afc2_1"]."','".$_POST["afc2_2"]."','".$_POST["afc3"]."','".$_POST["nfc1_1"]."','".$_POST["nfc1_2"]."','".$_POST["nfc2_1"]."','".$_POST["nfc2_2"]."','".$_POST["nfc3"]."','".$_POST["superbowl"]."','".$_POST["score"]."','".$_POST["mvp"]."')";

				if ($conn->query($sql) === TRUE) 
				{	
		    		$conn->close();
					header('Location: http://noahgrubb.com/bracket-challenge/?success=true');
		    	}
		    	else 
				{
					echo 'failed to create bracket';
					$conn->close();
				    //header('index.php?error=true&sqlerror=true');
				}

			} 
			else 
			{	
				echo 'failed to create user';
				$conn->close();
			    //header('index.php?error=true&sqlerror=true');
			}
		}

	}
}
else
{
	echo 'no post data';
	//header('index.php?error=true');
}