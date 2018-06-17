<!doctype html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>NFL Bracket Challenge</title>
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
		.container h4 { font-weight: 700; margin-top: 0.8rem; }
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
		.container.sticky {
		    position: fixed;
		    height: 50px;
		    width: 100%;
		    z-index: 1100;
		    background-color: rgba(0, 0, 0, 0.85);
		}
		#spacer { padding-top: 25px; }
		.incorrect { 
			-webkit-filter: blur(2px) grayscale(1);
  			filter: blur(2px) grayscale(1); 
  		}
  		.game-error { border: red 2px solid; }
	</style>
</head>
<body>
	<?php 

	$servername = "localhost";
	$username = "";
	$password = "";
	$dbname = "nfl_bracket";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	// get player by id
	$player_id = $_GET['id'];
	$sql = "SELECT * FROM players WHERE player_id = '$player_id'";

	$result = $conn->query($sql);

	if ( $result->num_rows > 0 ) : while($row = $result->fetch_assoc()) : ?>
	<div class="container sticky">
		<h2 class="pull-left"><?php echo $row["name"]; ?>'s Bracket</h2>
		<h4 class="pull-right"><strong>Score:</strong> <?php echo $row["score"]; ?></h4>
	</div>
	<div id="spacer">&nbsp;</div>
	<?php endwhile; endif;

	$sql = "SELECT * FROM brackets WHERE player_id = $player_id";
	$result = $conn->query($sql);

	if ( $result->num_rows > 0 ) : while($row = $result->fetch_assoc()) :

		// if ( $row['superbowl_mvp'] == $_GET['password'] ): ?>
			<input type="hidden" name="player_id" value="<?php echo $player_id; ?>" />
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
			            	
			              	<div class="team">
			  					<div class="overlay" style="background-color: #060607"></div>
								<div class="text-block">
								    <div class="text-block-interior">
								      	<div class="seed s-top">(6)</div>
								      	<h5>
								        	<span class="long">
								          	Pittsburgh
								            </span>
								          	Steelers
								      	</h5>
								      	<div class="seed s-bottom">(6)</div>
								    </div>
								</div>
								<img class="logo steelers <?php if ( $row['afc_1_1'] != 'https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/64/large_behindthesteelcurtain.com.minimal.png' ) echo 'faded'; ?>" src="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/64/large_behindthesteelcurtain.com.minimal.png">
							</div>
			              	<div class="tv text-center">CBS</div>
			              	<div class="centre">
			               		<div class="centre-interior">
			                    	<span class="date">Jan. 9,</span> <span class="time-object">8:15 p.m. ET</span><span class="mobile-tv">CBS</span>
			                	</div>
			              	</div>
			              	<div class="team">
			  					<div class="overlay" style="background-color: #ea6a28"></div>
							  	<div class="text-block">
							    	<div class="text-block-interior">
							      		<div class="seed s-top">(3)</div>
							      		<h5>
							        	<span class="long">
							          		Cincinnati
							            </span>
							          	Bengals
							      		</h5>
							      		<div class="seed s-bottom">(3)</div>
							   		</div>
								</div>
								<img class="logo bengals <?php if ( $row['afc_1_1'] != 'https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png' ) echo 'faded'; ?>" src="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png">
							</div>
							<input type="hidden" data-seed="0" id="afc1_1" name="afc1_1" value="<?php echo $row['afc_1_1']; ?>" />

						</div>

			            <div class="game visible" data-game="afc1_2">
			            	
			             	<div class="team">
			  					<div class="overlay" style="background-color: #c02428"></div>
			  					<div class="text-block">
								    <div class="text-block-interior">
								      	<div class="seed s-top">(5)</div>
								      		<h5>
								        	<span class="long">
								          	Kansas
								          	City
								            </span>
								          	Chiefs
								      	</h5>
								      	<div class="seed s-bottom">(5)</div>
								    </div>
								</div>
								<img class="logo chiefs <?php if ( $row['afc_1_2'] != 'https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/59/large_arrowheadpride.com.minimal.png' ) echo 'faded'; ?>" src="https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/59/large_arrowheadpride.com.minimal.png">
							</div>
				            <div class="tv text-center">ABC/ESPN</div>
				            <div class="centre">
				                <div class="centre-interior">
				                    <span class="date">Jan. 9,</span> 
				                    <span class="time-object">4:35 p.m. ET</span>
				                    <span class="mobile-tv">ABC/ESPN</span>
				                </div>
				            </div>
			            	<div class="team">
							  	<div class="overlay" style="background-color: #9f2739"></div>
							  	<div class="text-block">
							    	<div class="text-block-interior">
							      		<div class="seed s-top">(4)</div>
							      		<h5>
							        		<span class="long">
							          		Houston
							            	</span>
							          		Texans
							      		</h5>
							      		<div class="seed s-bottom">(4)</div>
							    	</div>
							  	</div>
							  	<img class="logo texans <?php if ( $row['afc_1_2'] != 'https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/74/large_battleredblog.com.minimal.41427.png' ) echo 'faded'; ?>" src="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/74/large_battleredblog.com.minimal.41427.png">
							</div>
							<input type="hidden" data-seed="0" id="afc1_2" name="afc1_2" value="<?php echo $row['afc_1_2']; ?>" />
			            </div>

			        </div>


			        <div class="column sevenths text-center NFC WC">
			          	
			          	<div class="topper">
			            	<h4> Wild Card </h4>
			          	</div>

			            <div class="game visible" data-game="nfc1_1">
			            	
			              	<div class="team">
							  	<div class="overlay" style="background-color: #263564"></div>
							  	<div class="text-block">
							    	<div class="text-block-interior">
							      		<div class="seed s-top">(6)</div>
								      	<h5>
								        	<span class="long">
								          	Seattle
								            </span>
								          	Seahawks
								      	</h5>
							      		<div class="seed s-bottom">(6)</div>
							    	</div>
							  	</div>
							  	<img class="logo seahawks <?php if ( $row['nfc_1_1'] != 'https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/60/large_fieldgulls.com.minimal.png' ) echo 'faded'; ?>" src="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/60/large_fieldgulls.com.minimal.png">
							</div>
			              	<div class="tv text-center">NBC</div>
			              	<div class="centre">
			                	<div class="centre-interior">
			                    	<span class="date">Jan. 10,</span> <span class="time-object">1:05 p.m. ET</span><span class="mobile-tv">NBC</span>
			                	</div>
			              	</div>
			              	<div class="team">
			  					<div class="overlay" style="background-color: #3a2762"></div>
								  	<div class="text-block">
								    	<div class="text-block-interior">
								      		<div class="seed s-top">(3)</div>
									      	<h5>
									        	<span class="long">
									          	Minnesota
									            </span>
									          	Vikings
									      	</h5>
							      		<div class="seed s-bottom">(3)</div>
							    	</div>
							  	</div>
							  	<img class="logo vikings <?php if ( $row['nfc_1_1'] != 'https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png' ) echo 'faded'; ?>" src="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png">
							</div>
							<input type="hidden" data-seed="0" id="nfc1_1" name="nfc1_1" value="<?php echo $row['nfc_1_1']; ?>" />
			          	</div>

			            <div class="game visible" data-game="nfc1_2">
			            	
			              	<div class="team">
							  	<div class="overlay" style="background-color: #343e37"></div>
						  		<div class="text-block">
						    		<div class="text-block-interior">
							      		<div class="seed s-top">(5)</div>
								      	<h5>
								        	<span class="long">
								          	Green
								          	Bay
								            </span>
								          	Packers
								      	</h5>
								      	<div class="seed s-bottom">(5)</div>
						    		</div>
						  		</div>
						  		<img class="logo packers <?php if ( $row['nfc_1_2'] != 'https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/77/large_acmepackingcompany.com.minimal.png' ) echo 'faded'; ?>" src="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/77/large_acmepackingcompany.com.minimal.png">
							</div>
			              	<div class="tv text-center">FOX</div>
			              	<div class="centre">
			                	<div class="centre-interior">
			                    	<span class="date">Jan. 10,</span> <span class="time-object">4:40 p.m. ET</span><span class="mobile-tv">FOX</span>
			                	</div>
			              	</div>
			              	<div class="team">
							  	<div class="overlay" style="background-color: #791e34"></div>
							  	<div class="text-block">
							    	<div class="text-block-interior">
							      		<div class="seed s-top">(4)</div>
							      		<h5>
									        <span class="long">
									        Washington
									        </span>
									        Redskins
									    </h5>
									    <div class="seed s-bottom">(4)</div>
									</div>
								</div>
							  	<img class="logo redskins <?php if ( $row['nfc_1_2'] != 'https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/61/large_hogshaven.com.minimal.png' ) echo 'faded'; ?>" src="https://cdn3.vox-cdn.com/uploads/blog/sbnu_logo_minimal/61/large_hogshaven.com.minimal.png">
							</div>
							<input type="hidden" data-seed="0" id="nfc1_2" name="nfc1_2" value="<?php echo $row['nfc_1_2']; ?>" />
			            </div>
			        </div>

			        <div class="column sevenths text-center AFC DR">
			          	
			          	<div class="topper">
			            	<h4> Divisional Round </h4>
			          	</div>

			          	<?php // determine where wildcard winners are placed in divisional round
			          		if( $row['afc_1_1'] == 'https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/66/large_cincyjungle.com.minimal.png' )
			          		{
			          			$afc_2_1 = $row['afc_1_1'];
			          			$afc_2_2 = $row['afc_1_2'];
			          		}
			          		else
			          		{
			          			$afc_2_1 = $row['afc_1_2'];
			          			$afc_2_2 = $row['afc_1_1'];
			          		}
			          	?>

			            <div class="game visible" data-game="afc2_1">
			            	
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
								<img class="logo top <?php if ( $row['afc_2_1'] != $afc_2_1 ) echo 'faded'; ?>" src="<?php echo $afc_2_1; ?>">
							</div>
				            <div class="tv text-center">CBS</div>
			            	<div class="centre">
			                	<div class="centre-interior">
			                    	<span class="date">Jan. 16,</span> <span class="time-object">4:35 p.m. ET</span><span class="mobile-tv">CBS</span>
			                	</div>
			              	</div>
			              	<div class="team">
							  	<div class="overlay" style="background-color: #153056"></div>
							  	<div class="text-block">
							    	<div class="text-block-interior">
							      		<div class="seed s-top">(2)</div>
							      		<h5>
							        		<span class="long">
							          		New
							          		England
							            	</span>
							          		Patriots
							      		</h5>
							      		<div class="seed s-bottom">(2)</div>
							    	</div>
							  	</div>
							  	<img class="logo patriots bottom <?php if ( $row['afc_2_1'] != 'https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/82/large_patspulpit.com.minimal.png' ) echo 'faded'; ?>" src="https://cdn0.vox-cdn.com/uploads/blog/sbnu_logo_minimal/82/large_patspulpit.com.minimal.png">
							</div>
							<input type="hidden" data-seed="0" id="afc2_1" name="afc2_1" value="<?php echo $row['afc_2_1']; ?>" />
			            </div>

			            <div class="game visible" data-game="afc2_2">
			            	
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
							  	<img class="logo top <?php if ( $row['afc_2_2'] != $afc_2_2 ) echo 'faded'; ?>" src="<?php echo $afc_2_2; ?>">
							</div>
			              	<div class="tv text-center">CBS</div>
			              	<div class="centre">
			                	<div class="centre-interior">
			                    	<span class="date">Jan. 17,</span> <span class="time-object">4:40 p.m. ET</span><span class="mobile-tv">CBS</span>
			                	</div>
			              	</div>
			              	<div class="team">
							  	<div class="overlay" style="background-color: #f05523"></div>
							  	<div class="text-block">
							    	<div class="text-block-interior">
							      		<div class="seed s-top">(1)</div>
							      		<h5>
							        		<span class="long">
							          		Denver
							            	</span>
							          		Broncos
							      		</h5>
							      		<div class="seed s-bottom">(1)</div>
							    	</div>
							  	</div>
							  	<img class="logo broncos bottom <?php if ( $row['afc_2_2'] != 'https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/55/large_milehighreport.com.minimal.83019.png' ) echo 'faded'; ?>" src="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/55/large_milehighreport.com.minimal.83019.png">
							</div>
							<input type="hidden" data-seed="0" id="afc2_2" name="afc2_2" value="<?php echo $row['afc_2_2']; ?>" />
			            </div>

			        </div>

			        <div class="column sevenths text-center NFC DR">
			          	
			          	<div class="topper">
			            	<h4> Divisional Round </h4>
			         	</div>

			         	<?php
				         	if( $row['nfc_1_1'] == 'https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/65/large_dailynorseman.com.minimal.png' )
			          		{
			          			$nfc_2_1 = $row['nfc_1_1'];
			          			$nfc_2_2 = $row['nfc_1_2'];
			          		}
			          		else
			          		{
			          			$nfc_2_1 = $row['nfc_1_2'];
			          			$nfc_2_2 = $row['nfc_1_1'];
			          		}
			          	?>
			            <div class="game visible" data-game="nfc2_1">
			            	
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
							  	<img class="logo top <?php if ( $row['nfc_2_1'] != $nfc_2_1 ) echo 'faded'; ?>" src="<?php echo $nfc_2_1; ?>">
							</div>
			              	<div class="tv text-center">NBC</div>
			              	<div class="centre">
			                	<div class="centre-interior">
			                    	<span class="date">Jan. 16,</span> <span class="time-object">8:15 p.m. ET</span><span class="mobile-tv">NBC</span>
			                	</div>
			              	</div>
			              	<div class="team">
							  	<div class="overlay" style="background-color: #ab0125"></div>
							  	<div class="text-block">
							    	<div class="text-block-interior">
							      		<div class="seed s-top">(2)</div>
							      		<h5>
							        		<span class="long">
							          		Arizona
							            	</span>
							          		Cardinals
							      		</h5>
							      		<div class="seed s-bottom">(2)</div>
							    	</div>
							  	</div>
							  	<img class="logo cardinals bottom <?php if ( $row['nfc_2_1'] != 'https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/83/large_revengeofthebirds.com.minimal.png' ) echo 'faded'; ?>" src="https://cdn1.vox-cdn.com/uploads/blog/sbnu_logo_minimal/83/large_revengeofthebirds.com.minimal.png">
							</div>
							<input type="hidden" data-seed="0" id="nfc2_1" name="nfc2_1" value="<?php echo $row['nfc_2_1']; ?>" />
						</div>
			              
			            <div class="game visible" data-game="nfc2_2">
			            	
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
						  		<img class="logo top <?php if ( $row['nfc_2_2'] != $nfc_2_2 ) echo 'faded'; ?>" src="<?php echo $nfc_2_2; ?>">
							</div>
			              	<div class="tv text-center">FOX</div>
			              	<div class="centre">
			                	<div class="centre-interior">
			                    	<span class="date">Jan. 17,</span> <span class="time-object">1:05 p.m. ET</span><span class="mobile-tv">FOX</span>
			                	</div>
			              	</div>
			              	<div class="team">
								<div class="overlay" style="background-color: #3b94d1"></div>
								<div class="text-block">
								    <div class="text-block-interior">
								    	<div class="seed s-top">(1)</div>
								      	<h5>
								        	<span class="long">
								          	Carolina
								            </span>
								          	Panthers
								      	</h5>
								      	<div class="seed s-bottom">(1)</div>
								    </div>
								</div>
								<img class="logo panthers bottom <?php if ( $row['nfc_2_2'] != 'https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/80/large_catscratchreader.com.minimal.png' ) echo 'faded'; ?>" src="https://cdn2.vox-cdn.com/uploads/blog/sbnu_logo_minimal/80/large_catscratchreader.com.minimal.png">
							</div>
							<input type="hidden" data-seed="0" id="nfc2_2" name="nfc2_2" value="<?php echo $row['nfc_2_2']; ?>" />
			            </div>

			        </div>

			        <div class="column sevenths text-center AFC CR">
			          
			          	<div class="topper">
			            	<h4> Championship Round </h4>
			          	</div>
			            <div class="game" data-game="afc3">
			            	
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
							  	<img class="logo top <?php if ( $row['afc_champ'] != $row['afc_2_1'] ) echo 'faded'; ?>" src="<?php echo $row['afc_2_1']; ?>">
							</div>
			              	<div class="tv text-center">CBS</div>
			              	<div class="centre">
			                	<div class="centre-interior">
			                    	<span class="date">Jan. 24,</span> <span class="time-object">3:05 p.m. ET</span><span class="mobile-tv">CBS</span>
			                	</div>
			              	</div>
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
							  	<img class="logo bottom <?php if ( $row['afc_champ'] != $row['afc_2_2'] ) echo 'faded'; ?>" src="<?php echo $row['afc_2_2']; ?>">
							</div>
							<input type="hidden" data-seed="0" id="afc3" name="afc3" value="<?php echo $row['afc_champ']; ?>" />
			            </div>
			        </div>

			        <div class="column sevenths text-center NFC CR">
			          	<div class="topper">
			            	<h4> Championship Round </h4>
			          	</div>
			            <div class="game" data-game="nfc3">
			            	
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
							  	<img class="logo top <?php if ( $row['nfc_champ'] != $row['nfc_2_1'] ) echo 'faded'; ?>" src="<?php echo $row['nfc_2_1']; ?>">
							</div>
			              	<div class="tv text-center">FOX</div>
			              	<div class="centre">
			                	<div class="centre-interior">
			                    	<span class="date">Jan. 24,</span> <span class="time-object">6:40 p.m. ET</span><span class="mobile-tv">FOX</span>
			                	</div>
			              	</div>
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
							  	<img class="logo bottom <?php if ( $row['nfc_champ'] != $row['nfc_2_2'] ) echo 'faded'; ?>" src="<?php echo $row['nfc_2_2']; ?>">
							</div>
							<input type="hidden" data-seed="0" id="nfc3" name="nfc3" value="<?php echo $row['nfc_champ']; ?>" />
			            </div>
			        </div>
			    </div>

			    <div class="column sevenths text-center SB SB end">
			            
		            <div class="topper">
		              	<h4>Super Bowl</h4>
		            </div>
		            <div class="game" data-game="superbowl">
		            	
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
						  	<img class="logo top <?php if ( $row['superbowl_champ'] != $row['afc_champ'] ) echo 'faded'; ?>" src="<?php echo $row['afc_champ']; ?>">
						</div>
		              	<div class="tv text-center">CBS</div>
		              	<div class="centre">
		                	<div class="centre-interior">
		                    	<span class="date">Feb. 7,</span> <span class="time-object">6:30 p.m. ET</span><span class="mobile-tv">CBS</span>
		                	</div>
		              	</div>
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
						  	<img class="logo bottom <?php if ( $row['superbowl_champ'] != $row['nfc_champ'] ) echo 'faded'; ?>" src="<?php echo $row['nfc_champ']; ?>">
						</div>
						<input type="hidden" data-seed="0" id="superbowl" name="superbowl" value="<?php echo $row['superbowl_champ']; ?>" />
		            </div>

		        </div>
			
			</div>
			<div class="container clearfix">
				<p>&nbsp;</p>

				<h4>Tiebreakers</h4>

				<div class="form-group">
					<label for="score" class="control-label">Superbowl Score: </label>
					<input type="text" id="score" name="score" class="form-control" value="<?php echo $row['score']; ?>" />
				</div>
				<div class="form-group">
					<label for="mvp" class="control-label">Superbowl MVP: </label>
					<input type="text" id="mvp" name="mvp" class="form-control" value="<?php echo $row['superbowl_mvp']; ?>" />
				</div>
				
				<input type="submit" class="btn btn-warning pull-right" value="Submit Entry"/>
				<p style="clear:both;">&nbsp;</p>
			</div>

	<?php endwhile; endif; 
	$conn->close(); ?>	

<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>