<?php require 'db-connect.php'; ?>
<!doctype html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>NFL Bracket Challenge</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">	
</head>
<body>
	<div class="container">

		<h1>NFL Bracket Challenge</h1>
		<p><strong>Rules:</strong> 10$ buy-in, winner-takes-all. <br>
		   <strong>Scoring:</strong> Each team that you guess correctly as making it through to the next round will award you with the following point amounts.
		   <ul>
			   <li>Wildcard Games: <strong>1pt</strong></li>
			   <li>Divisional Round: <strong>2pts</strong></li>
			   <li>Championship Round: <strong>5pts</strong></li>
			   <li>Superbowl: <strong>10pts</strong></li>
			   <br>
			   <li>Tiebreaker: Superbowl Score</li>
			   <li>2nd Tiebreaker: Superbowl MVP</li>
		   </ul><br>
		   If you have any questions/issues, you can reach me @ 717-592-8617. You can pay me after the games start, but your entry won't show up on the leaderboard until I recieve your entry fee. You can paypal me your entry fee using that phone number.
		  </p>
		  <br />

		<?php if ( !empty($_GET['success']) && $_GET['success'] == 'true' ) : ?>
		<br>
		<div class="panel panel-success"> 
			<div class="panel-heading"><h3 class="panel-title">Great Success!</h3></div> 
			<div class="panel-body">Your entry has been succesfully submitted! You will appear on the standings board once Noah has received payment and approved your entry!</div> 
		</div>
		<?php elseif ( !empty($_GET['update']) && $_GET['update'] == 'true' ) : ?>
		<br>
		<div class="panel panel-success"> 
			<div class="panel-heading"><h3 class="panel-title">Great Success!</h3></div> 
			<div class="panel-body">Your entry has been updated succesfully!</div> 
		</div>
	<?php elseif ( !empty($_GET['registered']) && $_GET['registered'] == 'true' ) : ?>
		<br>
		<div class="panel panel-success"> 
			<div class="panel-heading"><h3 class="panel-title">Great Success!</h3></div> 
			<div class="panel-body">Your account has been created succesfully! You can now login and submit a bracket.</div> 
		</div>
		<?php endif;

		$sql = "SELECT ID, name, score FROM users WHERE paid = 1 ORDER BY score DESC";
		$result = $conn->query($sql);

		//checks cookies to make sure they are logged in 
		if( isset( $_COOKIE['ng-bracket-user']) ) : 

			$username = $_COOKIE['ng-bracket-user'];

			?>

			<div class="heading clearfix">
				<h2 class="pull-left">Standings <span>(Current Pot: $<?php echo $result->num_rows * 10; ?>)</span></h2>
				<a href="enter.php" class="btn btn-primary pull-right enter-button">Enter Bracket</a>
			</div>
			<div class="table-responsive">
				<table class="table table-bordered table-hover">
					<tr>
						<th>Name</th>
						<th>Score</th>
					</tr>
					<?php if ( $result->num_rows > 0 ) : while($row = $result->fetch_assoc()) : ?>
					<tr class="clickable" data-player="<?php echo $row["player_id"]; ?>">
						<td><?php echo $row["name"]; ?></td>
						<td><?php echo $row["score"]; ?></td>
					</tr>
					<?php endwhile; endif; $conn->close(); ?>
				</table>
			</div>

		<?php else : ?>

			<div class="join-box well clearfix">
				<h2>Join the Challenge</h2>
				<h4>Current Pot: $<?php echo $result->num_rows * 10; ?></h4>

				<?php include 'login-register-form.php'; ?>

			</div>

		<?php endif; ?>

	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="js/main.js"></script>
	<script>
		$(document).ready(function($) {
		    
		    $(".clickable").click(function() {
		        window.document.location = 'bracket.php?id='+$(this).data("player");
		    });

		    $('#login-form-link').click(function(e) {
		    	$("#login-form").delay(100).fadeIn(100);
		 		$("#register-form").fadeOut(100);
				$('#register-form-link').removeClass('active');
				$(this).addClass('active');
				e.preventDefault();
			});
			$('#register-form-link').click(function(e) {
				$("#register-form").delay(100).fadeIn(100);
		 		$("#login-form").fadeOut(100);
				$('#login-form-link').removeClass('active');
				$(this).addClass('active');
				e.preventDefault();
			});

		});
	</script>

</body>
</html>