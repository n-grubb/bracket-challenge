<?php
/*
 * Logs in users
 */

require 'db-connect.php';

// Run only on submission.
if ( isset($_POST) ) { 

	// makes sure they filled it in
 	if( empty($_POST['username']) ){
 		die('You did not fill in a username.');
 	}
 	if( empty($_POST['password']) ){
 		die('You did not fill in a password.');
 	}

 	$password = stripslashes($_POST['password']);
	$username = stripslashes($_POST['username']);

 	$check_query  = "SELECT * FROM users WHERE username = '$username'";
	$user_check   = $conn->query($check_query);
 	// throw error if user dosen't exist
 	if ( $user_check->num_rows < 1 ) {
		die('That user does not exist.<br /><br />Please try again or <a href="/bracket-challenge/index.php#register">register</a>.');
	}

	$hashed_password = md5( $password );
	while( $user = $user_check->fetch_object() ) {

		$user->password = stripslashes( $user->password );
		if ( $hashed_password != $user->password ) {
			die('Incorrect password, please <a href="login.php">try again</a>.');
		}
		else {
			setcookie( 'ng-bracket-user', $username); 
 			header("Location: index.php");
		}

	}

}
else {
	die('Unauthorized access');
}