<?php
	$servername = "localhost";
	$username = "";
	$password = "";
	$dbname = "nfl_bracket";

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	if ( !empty($_GET['player_id']) )
	{
		$sql = "UPDATE players SET paid = 1 WHERE player_id = ".$_GET['player_id'];
		$result = $conn->query($sql);
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
	</style>
</head>
<body>

	<div class="container">

		<div class="heading clearfix">
			<h2 class="pull-left">Unapproved Entries</h2>
		</div>
		<div class="table-responsive">
			<table class="table table-bordered table-hover">
				<tr>
					<th colspan="2">Name</th>
				</tr>
				<?php 

				$sql = "SELECT player_id, name, score FROM players WHERE paid = 0";
				$result = $conn->query($sql);

				if ( $result->num_rows > 0 ) : while($row = $result->fetch_assoc()) : ?>
				<tr class="clickable" data-player="<?php echo $row["player_id"]; ?>">
					<td><?php echo $row["name"]; ?></td>
					<td><a href="approve-users.php?player_id=<?php echo $row["player_id"]; ?>">Approve</a>
				</tr>
				<?php endwhile; endif; $conn->close(); ?>
			</table>
		</div>
	
	</div>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="js/main.js"></script>
</body>