<!doctype html>
<html>
<head>
	<meta id="viewpo" name="viewport" content="width=device-width, initial-scale=1.0">
	<title>2017 NFL Bracket Challenge</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/sb.css">	
	<link href='https://fonts.googleapis.com/css?family=Lato:400,700,300,900' rel='stylesheet' type='text/css'>

	<style>
		body { background-color: rgba(0, 0, 0, 0.85); }
		.container h2, 
		.container label, 
		.container h4,
		.container input {
		    color: white;
		    font-family: "Lato", sans-serif;
		    text-transform: uppercase;
		}
		.container h2 { font-weight: 900; }
		.container h4 { font-weight: 700; }
		.container label { font-weight: 300; }
		.container input[type=text] { color: black; }
		.conferences { background: white; }	
		.collapse {
    		display: block !important;
		}
		.logo { z-index: 1000; }
		.toggle-container { z-index: 1001 !important; }
		.faded { 
			-webkit-filter: blur(2px) grayscale(1);
  			filter: blur(2px) grayscale(1);
		}
		.game-error { border: red 2px solid; }
		.game .team h5 { font-style: normal !important; }
	</style>
</head>
<body>

<?php

	$servername = "localhost";
	$username = "";
	$password = "";
	$dbname = "nfl_bracket";

	$conn = new mysqli($servername, $username, $password, $dbname);
	if ($conn->connect_error) 
	{
	    die("Connection failed: " . $conn->connect_error);
	} 

	$sql = "SELECT * FROM teams";
	$result = $conn->query($sql);

	$afc = array();
	$nfc = array();
	if ( $result->num_rows > 0 ) : while( $row = $result->fetch_object() ) :
		if ( $row->conference == 'afc' )
			$afc[$row->seed] = $row;
		else
			$nfc[$row->seed] = $row;
	endwhile; endif; 

?>

<form action="process-entry.php" id="bracket-selector" method="post">

	<div class="row full text-center collapse conferences toggle">
		<div class="toggle-container afc-select">
			<div class="column small-6 afc"><h2>afc</h2></div>
			<div class="column small-6 nfc"><h2>nfc</h2></div>
		</div>
	</div>

	<div class="row full collapse conferences">
		<div class="conferences-inner">

			<div class="column sevenths text-center AFC WC">
				<div class="topper">
		            <h4>
		                Wild Card
		            </h4>
		        </div>
		        <div class="game visible" data-game="afc1_1">
	             	<?php 
	             	team_html( $afc[5] ); 
					network_html( 'Jan. 7', '4:35', 'ABC/ESPN' );
					team_html( $afc[4] ); 
					?>
					<input type="hidden" data-seed="0" id="afc1_1" name="afc1_1" value="" />
	            </div>
		        <div class="game visible" data-game="afc1_2">
	              	<?php 
	              	team_html( $afc[6] );
	              	network_html( 'Jan. 8', '1:05', 'CBS' ); 
	              	team_html( $afc[3] ); 
	              	?>
					<input type="hidden" data-seed="0" id="afc1_2" name="afc1_2" value="" />
				</div>
			</div>
		
			<div class="column sevenths text-center NFC WC">	
	          	<div class="topper">
	            	<h4> Wild Card </h4>
	          	</div>
	          	<div class="game visible" data-game="nfc1_1">
	          		<?php 
	             	team_html( $nfc[6] ); 
					network_html( 'Jan. 7', '8:15', 'NBC' );
					team_html( $nfc[3] ); 
					?>
	          		<input type="hidden" data-seed="0" id="nfc1_1" name="nfc1_1" value="" />
	            </div>
		        <div class="game visible" data-game="nfc1_2">
		        	<?php 
	             	team_html( $nfc[5] ); 
					network_html( 'Jan. 8', '4:40', 'FOX' );
					team_html( $nfc[4] ); 
					?>
		        	<input type="hidden" data-seed="0" id="nfc1_2" name="nfc1_2" value="" />
				</div>
			</div>

			<div class="column sevenths text-center AFC DR">
	          	<div class="topper">
	            	<h4> Divisional Round </h4>
	          	</div>
	            <div class="game visible" data-game="afc2_1">
	            	<?php 
	             	tbd_team( 'top' );
					network_html( 'Jan. 14', '8:15', 'CBS' );
					team_html( $afc[1] ); 
					?>
	          		<input type="hidden" data-seed="0" id="afc2_1" name="afc2_1" value="" />
	            </div>
	           	<div class="game visible" data-game="afc2_2">
		        	<?php 
	             	tbd_team( 'top' );
					network_html( 'Jan. 15', '1:05', 'CBS' );
					team_html( $afc[2] ); 
					?>
	          		<input type="hidden" data-seed="0" id="afc2_2" name="afc2_2" value="" />
	            </div>
	        </div>

	        <div class="column sevenths text-center NFC DR">
	          	<div class="topper">
	            	<h4> Divisional Round </h4>
	         	</div>
	         	<div class="game visible" data-game="nfc2_1">
	            	<?php 
	             	tbd_team( 'top' );
					network_html( 'Jan. 14', '4:35', 'FOX' );
					team_html( $nfc[2] ); 
					?>
	          		<input type="hidden" data-seed="0" id="nfc2_1" name="nfc2_1" value="" />
	            </div>
	           	<div class="game visible" data-game="nfc2_2">
		        	<?php 
	             	tbd_team( 'top' );
					network_html( 'Jan. 15', '4:40', 'FOX' );
					team_html( $nfc[1] ); 
					?>
	          		<input type="hidden" data-seed="0" id="nfc2_2" name="nfc2_2" value="" />
	            </div>
	        </div>

	        <div class="column sevenths text-center AFC CR">
	          	<div class="topper">
	            	<h4> Championship Round </h4>
	          	</div>
	            <div class="game" data-game="afc3">
	            	<?php 
	             	tbd_team( 'top' );
					network_html( 'Jan. 22', '3:05', 'CBS' );
					tbd_team( 'bottom' );
					?>
					<input type="hidden" data-seed="0" id="afc3" name="afc3" value="" />
	            </div>
	        </div>

	        <div class="column sevenths text-center NFC CR">
	          	<div class="topper">
	            	<h4> Championship Round </h4>
	          	</div>
	            <div class="game" data-game="nfc3">
	            	<?php 
	             	tbd_team( 'top' );
					network_html( 'Jan. 22', '6:40', 'FOX' );
					tbd_team( 'bottom' );
					?>
					<input type="hidden" data-seed="0" id="nfc3" name="nfc3" value="" />
	            </div>
	        </div>

	        <div class="column sevenths text-center SB SB end">
	            <div class="topper">
	              	<h4>Super Bowl</h4>
	            </div>
	            <div class="game" data-game="superbowl">
	            	<?php 
	             	tbd_team( 'top' );
					network_html( 'Feb. 5', '6:30', 'CBS' );
					tbd_team( 'bottom' );
					?>
	            	<input type="hidden" data-seed="0" id="superbowl" name="superbowl" value="" />
	            </div>
	        </div>

		</div>
	</div>

	<div class="container clearfix">
		<p>&nbsp;</p>

		<h4>Tiebreakers</h4>

		<div class="form-group">
			<label for="score" class="control-label">Superbowl Score: </label>
			<input type="text" id="score" name="score" class="form-control" value="" />
		</div>
		<div class="form-group">
			<label for="mvp" class="control-label">Superbowl MVP: </label>
			<input type="text" id="mvp" name="mvp" class="form-control" value="" />
		</div>
		
		<input type="submit" class="btn btn-warning pull-right" value="Submit Entry"/>
		<p style="clear:both;">&nbsp;</p>
	</div>

</form>	

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>


<?php 
function team_html( $team ) {
?>
	<div class="team">
	  	<div class="overlay" style="background-color: #060607"></div>
		<div class="text-block">
			<div class="text-block-interior">
				<div class="seed s-top">(<?php echo $team->seed; ?>)</div>
				<h5><span class="long"><?php echo $team->city; ?></span> <?php echo $team->name; ?></h5>
				<div class="seed s-bottom">(<?php echo $team->seed; ?>)</div>
			</div>
		</div>
		<img class="logo <?php echo strtolower($team->name); ?>" src="<?php echo $team->logo; ?>">
	</div>
<?php
}

function tbd_team( $class ) {
?>
	<div class="team">
		<div class="overlay" style="background-color: transparent"></div>
	  	<div class="text-block">
	    	<div class="text-block-interior">
	      		<div class="seed s-top"></div>
	      		<h5 class="fade">
	        		<span class="long">
	            	</span>
	          		TBD
		      	</h5>
		      	<div class="seed s-bottom"></div>
		    </div>
		</div>
		<img class="logo tbd <?php echo $class; ?>" src="https://cdn2.vox-cdn.com/uploads/chorus_asset/file/7717629/question-mark-button__2_.0.png">
	</div>
<?php
}

function network_html( $date, $time, $network ) {
?>
	<div class="tv text-center"><?php echo $network; ?></div>
    <div class="centre">
        <div class="centre-interior">
            <span class="date"><?php echo $date; ?>,</span> 
            <span class="time-object"><?php echo $time; ?> p.m. ET</span>
            <span class="mobile-tv"><?php echo $network; ?></span>
        </div>
    </div>
<?php
}