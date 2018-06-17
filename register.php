<?php
/*
 *  Register new users
 */

require 'db-connect.php';

// Run only on submission.
if ( isset($_POST) ) { 

	// Ensure the user did not leave any fields blank
	if ( !$_POST['username'] || !$_POST['real_name'] || !$_POST['password'] || !$_POST['confirm-password'] ) {
		die('You did not complete all of the required fields');
	}

	// encrypt the password and add slashes if needed
	$password  = md5($_POST['password']);
	$password  = addslashes($password);
	$username  = addslashes($_POST['username']);
	$real_name = addslashes($_POST['real_name']);

	// checks if the username is in use
	$username     = $_POST['username'];
	$check_query  = "SELECT username FROM users WHERE username = '$username'";
	$user_check   = $conn->query($check_query);
	// if the name exists it gives an error
	if ( $user_check->num_rows > 0 ) {
 		die('Sorry, the username '.$_POST['username'].' is already in use.');
	}

	// makes sure passwords match
	if ( $_POST['password'] != $_POST['confirm-password'] ) {
		die('Your passwords did not match. ');
	}

	// insert into the database
	$insert = "INSERT INTO users (username, password, real_name) VALUES ('".$username."', '".$password."', '".$real_name."')";
	if ( $conn->query($insert) === TRUE )
	{
		// redirect them to the index page 
		header("Location: index.php?registered=true"); 
	}

}