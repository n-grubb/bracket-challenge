<?php

	$servername = "localhost";
	$username = "";
	$password = "";
	$dbname = "nfl_bracket";
	$updated = false;
	$error = false;

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	}

	if ( !empty($_POST) )
	{

		$sql = "UPDATE brackets SET afc_1_1 = '".$_POST["afc_1_1"]."', afc_1_2 = '".$_POST["afc_1_2"]."', afc_2_1 = '".$_POST["afc_2_1"]."', afc_2_2 = '".$_POST["afc_2_2"]."', afc_champ = '".$_POST["afc_champ"]."', nfc_1_1 = '".$_POST["nfc_1_1"]."', nfc_1_2 = '".$_POST["nfc_1_2"]."', nfc_2_1 = '".$_POST["nfc_2_1"]."', nfc_2_2 = '".$_POST["nfc_2_2"]."', nfc_champ = '".$_POST["nfc_champ"]."', superbowl_champ = '".$_POST["superbowl"]."' WHERE player_id = 1";
		if ($conn->query($sql) === TRUE) 
		{	
			// grab all player_ids
			$sql = "SELECT name, player_id FROM players";
			$result = $conn->query($sql);
			$player_ids = array();
			$names = array();
			if ( $result->num_rows > 0 ) { 
				while($player = $result->fetch_assoc()){
					$player_ids[] = $player['player_id'];
					$names[ $player['player_id'] ] = $player['name'];
				} 
			} 
			else 
				$error = true;

			$sql = "SELECT * FROM brackets WHERE player_id = 1"; 
			$result = $conn->query($sql);

			if ( $result->num_rows > 0 ) { 
				while( $correct = $result->fetch_assoc() ){

					foreach ( $player_ids as $player_id ) {

						// compare player_id bracket to correct ($_POST)
						$sql = "SELECT * FROM brackets WHERE player_id = $player_id";
						$result = $conn->query($sql);
						if ( $result->num_rows > 0 ) { 
							while($row = $result->fetch_assoc()){	

								echo $names[ $player_id ] . ': ';

								$points = 0;

								if ( $row['afc_1_1'] == $correct['afc_1_1'] )	
									$points += 1;
								if ( $row['afc_1_2'] == $correct['afc_1_2'] )	
									$points += 1;
								if ( $row['nfc_1_1'] == $correct['nfc_1_1'] )	
									$points += 1;
								if ( $row['nfc_1_2'] == $correct['nfc_1_2'] )	
									$points += 1;

								if ( $row['afc_2_1'] == $correct['afc_2_1'] )	
									$points += 2;
								if ( $row['afc_2_2'] == $correct['afc_2_2'] )	
									$points += 2;
								if ( $row['nfc_2_1'] == $correct['nfc_2_1'] )	
									$points += 2;
								if ( $row['nfc_2_2'] == $correct['nfc_2_2'] )	
									$points += 2;

								if ( $row['afc_champ'] == $correct['afc_champ'] )	
									$points += 5;
								if ( $row['nfc_champ'] == $correct['nfc_champ'] )	
									$points += 5;

								if ( $row['superbowl_champ'] == $correct['superbowl_champ'] )	
									$points += 10;

								echo $points . '<br>';

								$sql = "UPDATE players SET score = $points WHERE player_id = $player_id";
								$conn->query($sql); 
								
							}
							$updated = true;
						}
						else
							$error = true;
					}
				}
			}
				/*

				BRACKET CHALLENGE:

				Display Bracket
					- use html form entry.php
					- no interactivity
					- style for incorrect guess
					- display name score in sticky header

					Scoring: 
						- compare entry to correct.
						- if ( correct != default && guess == correct )
							add point(s)
						  else
						  	add .incorrect to all logos of that team forward


				Update Scores
					
					Display dropdowns with winners. 
					Submit to update CORRECT and run score-update.

					Script : 

						foreach entry
					 		if ( correct != default && guess == correct )
								add point(s)


				*/


			
		}
		else
			$error = true;

	}

?>
<!doctype html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>NFL Bracket Challenge</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">	
	<style>
		.enter-button { margin-top: 20px; }
		td { text-transform: uppercase; font-weight: 600; }
	</style>
</head>
<body>
	<div class="container">

		<?php if ( $updated ) : ?>
		<br>
		<div class="panel panel-success"> 
			<div class="panel-heading"><h3 class="panel-title">Great Success!</h3></div> 
			<div class="panel-body">Scores have been updated!</div> 
		</div>
		<?php endif; ?>

		<?php if ( $error ) : ?>
		<br>
		<div class="panel panel-warning"> 
			<div class="panel-heading"><h3 class="panel-title">Error</h3></div> 
			<div class="panel-body">There has been an error attempting to update the scores.</div> 
		</div>
		<?php endif; ?>

		<h1>Update Scores</h1>
		<form action="" method="POST">

			<?php
			// get CORRECT entry
			$sql = "SELECT * FROM brackets WHERE player_id = 1";
			$result = $conn->query($sql);
			$row = $result->fetch_assoc();
			?>
			<div class="form-group">
				<label for="afc_1_1" class="control-label">AFC Wildcard Game 1 Winner: </label>
				<select name="afc_1_1">
					<option value="">TBD</option>
					<option <?php if ( $row['afc_1_1'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/64/large_behindthesteelcurtain.com.minimal.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/64/large_behindthesteelcurtain.com.minimal.png">Steelers</option>
					<option <?php if ( $row['afc_1_1'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png">Bengals</option>
				</select>
			</div>

			<div class="form-group">
				<label for="afc_1_2" class="control-label">AFC Wildcard Game 2 Winner: </label>
				<select name="afc_1_2">
					<option value="">TBD</option>
					<option <?php if ( $row['afc_1_2'] == "https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/59/large_arrowheadpride.com.minimal.png" ) echo 'selected'; ?> value="https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/59/large_arrowheadpride.com.minimal.png">Chiefs</option>
					<option <?php if ( $row['afc_1_2'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/74/large_battleredblog.com.minimal.41427.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/74/large_battleredblog.com.minimal.41427.png">Houston</option>
				</select>
			</div>

			<div class="form-group">
				<label for="nfc_1_1" class="control-label">NFC Wildcard Game 1 Winner: </label>
				<select name="nfc_1_1">
					<option value="">TBD</option>
					<option <?php if ( $row['nfc_1_1'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/60/large_fieldgulls.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/60/large_fieldgulls.com.minimal.png">Seahawks</option>
					<option <?php if ( $row['nfc_1_1'] == "https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png" ) echo 'selected'; ?> value="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png">Vikings</option>
				</select>
			</div>

			<div class="form-group">
				<label for="nfc_1_2" class="control-label">NFC Wildcard Game 2 Winner: </label>
				<select name="nfc_1_2">
					<option value="">TBD</option>
					<option <?php if ( $row['nfc_1_2'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/61/large_hogshaven.com.minimal.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/61/large_hogshaven.com.minimal.png">Redskins</option>
					<option <?php if ( $row['nfc_1_2'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/77/large_acmepackingcompany.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/77/large_acmepackingcompany.com.minimal.png">Packers</option>
				</select>
			</div>

			<div class="form-group">
				<label for="afc_2_1" class="control-label">AFC Divisional Game 1 Winner: </label>
				<select name="afc_2_1">
					<option value="">TBD</option>
					<option <?php if ( $row['afc_2_1'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/82/large_patspulpit.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/82/large_patspulpit.com.minimal.png">Patriots</option>
					<option <?php if ( $row['afc_2_1'] == "https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/59/large_arrowheadpride.com.minimal.png" ) echo 'selected'; ?> value="https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/59/large_arrowheadpride.com.minimal.png">Chiefs</option>
					<option <?php if ( $row['afc_2_1'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/74/large_battleredblog.com.minimal.41427.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/74/large_battleredblog.com.minimal.41427.png">Houston</option>
					<option <?php if ( $row['afc_2_1'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/64/large_behindthesteelcurtain.com.minimal.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/64/large_behindthesteelcurtain.com.minimal.png">Steelers</option>
					<option <?php if ( $row['afc_2_1'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png">Bengals</option>
				</select>
			</div>

			<div class="form-group">
				<label for="afc_2_2" class="control-label">AFC Divisional Game 2 Winner: </label>
				<select name="afc_2_2">
					<option value="">TBD</option>
					<option <?php if ( $row['afc_2_2'] == "https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/55/large_milehighreport.com.minimal.83019.png" ) echo 'selected'; ?> value="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/55/large_milehighreport.com.minimal.83019.png">Broncos</option>
					<option <?php if ( $row['afc_2_2'] == "https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/59/large_arrowheadpride.com.minimal.png" ) echo 'selected'; ?> value="https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/59/large_arrowheadpride.com.minimal.png">Chiefs</option>
					<option <?php if ( $row['afc_2_2'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/74/large_battleredblog.com.minimal.41427.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/74/large_battleredblog.com.minimal.41427.png">Houston</option>
					<option <?php if ( $row['afc_2_2'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/64/large_behindthesteelcurtain.com.minimal.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/64/large_behindthesteelcurtain.com.minimal.png">Steelers</option>
					<option <?php if ( $row['afc_2_2'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png">Bengals</option>
				</select>
			</div>

			<div class="form-group">
				<label for="nfc_2_1" class="control-label">NFC Divisional Game 1 Winner: </label>
				<select name="nfc_2_1">
					<option value="">TBD</option>
					<option <?php if ( $row['nfc_2_1'] == "https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/83/large_revengeofthebirds.com.minimal.png" ) echo 'selected'; ?> value="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/83/large_revengeofthebirds.com.minimal.png">Cardinals</option>
					<option <?php if ( $row['nfc_2_1'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/60/large_fieldgulls.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/60/large_fieldgulls.com.minimal.png">Seahawks</option>
					<option <?php if ( $row['nfc_2_1'] == "https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png" ) echo 'selected'; ?> value="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png">Vikings</option>
					<option <?php if ( $row['nfc_2_1'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/61/large_hogshaven.com.minimal.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/61/large_hogshaven.com.minimal.png">Redskins</option>
					<option <?php if ( $row['nfc_2_1'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/77/large_acmepackingcompany.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/77/large_acmepackingcompany.com.minimal.png">Packers</option>
				</select>
			</div>

			<div class="form-group">
				<label for="nfc_2_2" class="control-label">NFC Divisional Game 2 Winner: </label>
				<select name="nfc_2_2">
					<option value="">TBD</option>
					<option <?php if ( $row['nfc_2_2'] == "https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/80/large_catscratchreader.com.minimal.png" ) echo 'selected'; ?> value="https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/80/large_catscratchreader.com.minimal.png">Panthers</option>
					<option <?php if ( $row['nfc_2_2'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/60/large_fieldgulls.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/60/large_fieldgulls.com.minimal.png">Seahawks</option>
					<option <?php if ( $row['nfc_2_2'] == "https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png" ) echo 'selected'; ?> value="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png">Vikings</option>
					<option <?php if ( $row['nfc_2_2'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/61/large_hogshaven.com.minimal.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/61/large_hogshaven.com.minimal.png">Redskins</option>
					<option <?php if ( $row['nfc_2_2'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/77/large_acmepackingcompany.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/77/large_acmepackingcompany.com.minimal.png">Packers</option>
				</select>
			</div>

			<div class="form-group">
				<label for="afc_champ" class="control-label">AFC Championship Winner: </label>
				<select name="afc_champ">
					<option value="">TBD</option>
					<option <?php if ( $row['afc_champ'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/82/large_patspulpit.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/82/large_patspulpit.com.minimal.png">Patriots</option>
					<option <?php if ( $row['afc_champ'] == "https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/55/large_milehighreport.com.minimal.83019.png" ) echo 'selected'; ?> value="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/55/large_milehighreport.com.minimal.83019.png">Broncos</option>
					<option <?php if ( $row['afc_champ'] == "https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/59/large_arrowheadpride.com.minimal.png" ) echo 'selected'; ?> value="https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/59/large_arrowheadpride.com.minimal.png">Chiefs</option>
					<option <?php if ( $row['afc_champ'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/74/large_battleredblog.com.minimal.41427.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/74/large_battleredblog.com.minimal.41427.png">Houston</option>
					<option <?php if ( $row['afc_champ'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/64/large_behindthesteelcurtain.com.minimal.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/64/large_behindthesteelcurtain.com.minimal.png">Steelers</option>
					<option <?php if ( $row['afc_champ'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png">Bengals</option>
				</select>
			</div>

			<div class="form-group">
				<label for="nfc_champ" class="control-label">NFC Championship Winner: </label>
				<select name="nfc_champ">
					<option value="">TBD</option>
					<option <?php if ( $row['nfc_champ'] == "https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/83/large_revengeofthebirds.com.minimal.png" ) echo 'selected'; ?> value="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/83/large_revengeofthebirds.com.minimal.png">Cardinals</option>
					<option <?php if ( $row['nfc_champ'] == "https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/80/large_catscratchreader.com.minimal.png" ) echo 'selected'; ?> value="https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/80/large_catscratchreader.com.minimal.png">Panthers</option>
					<option <?php if ( $row['nfc_champ'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/60/large_fieldgulls.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/60/large_fieldgulls.com.minimal.png">Seahawks</option>
					<option <?php if ( $row['nfc_champ'] == "https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png" ) echo 'selected'; ?> value="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png">Vikings</option>
					<option <?php if ( $row['nfc_champ'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/61/large_hogshaven.com.minimal.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/61/large_hogshaven.com.minimal.png">Redskins</option>
					<option <?php if ( $row['nfc_champ'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/77/large_acmepackingcompany.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/77/large_acmepackingcompany.com.minimal.png">Packers</option>
				</select>
			</div>

			<div class="form-group">
				<label for="superbowl" class="control-label">Superbowl Winner: </label>
				<select name="superbowl">
					<option value="">TBD</option>
					<option <?php if ( $row['superbowl'] == "https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/83/large_revengeofthebirds.com.minimal.png" ) echo 'selected'; ?> value="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/83/large_revengeofthebirds.com.minimal.png">Cardinals</option>
					<option <?php if ( $row['superbowl'] == "https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/80/large_catscratchreader.com.minimal.png" ) echo 'selected'; ?> value="https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/80/large_catscratchreader.com.minimal.png">Panthers</option>
					<option <?php if ( $row['superbowl'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/60/large_fieldgulls.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/60/large_fieldgulls.com.minimal.png">Seahawks</option>
					<option <?php if ( $row['superbowl'] == "https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png" ) echo 'selected'; ?> value="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png">Vikings</option>
					<option <?php if ( $row['superbowl'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/61/large_hogshaven.com.minimal.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/61/large_hogshaven.com.minimal.png">Redskins</option>
					<option <?php if ( $row['superbowl'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/77/large_acmepackingcompany.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/77/large_acmepackingcompany.com.minimal.png">Packers</option>
					<option <?php if ( $row['superbowl'] == "https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/82/large_patspulpit.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/82/large_patspulpit.com.minimal.png">Patriots</option>
					<option <?php if ( $row['superbowl'] == "https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/55/large_milehighreport.com.minimal.83019.png" ) echo 'selected'; ?> value="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/55/large_milehighreport.com.minimal.83019.png">Broncos</option>
					<option <?php if ( $row['superbowl'] == "https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/59/large_arrowheadpride.com.minimal.png" ) echo 'selected'; ?> value="https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/59/large_arrowheadpride.com.minimal.png">Chiefs</option>
					<option <?php if ( $row['superbowl'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/74/large_battleredblog.com.minimal.41427.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/74/large_battleredblog.com.minimal.41427.png">Houston</option>
					<option <?php if ( $row['superbowl'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/64/large_behindthesteelcurtain.com.minimal.png" ) echo 'selected'; ?> value="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/64/large_behindthesteelcurtain.com.minimal.png">Steelers</option>
					<option <?php if ( $row['superbowl'] == "https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png" ) echo 'selected'; ?> value="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png">Bengals</option>
				</select>
			</div>

			<input type="submit" class="btn btn-warning pull-left" value="Run Updater"/>
			<?php $conn->close(); ?>

		</form>
	</div>
</body>