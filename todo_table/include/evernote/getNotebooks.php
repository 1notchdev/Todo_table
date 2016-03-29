<?php
//	require ('include/oauth_lib/autoload.php');
	require_once 'include/oauth_lib/autoload.php';
	$oauth_token = $_SESSION['oauth_token'];

	$sandbox = true;

	$client = new \Evernote\Client($oauth_token, $sandbox);

	$notebooks = array();

	$notebooks = $client->listNotebooks();

	$array_notebooks_names = array();
	foreach ($notebooks as $notebook) {
		array_push($array_notebooks_names,$notebook->name); 
	}
	$jsonevernotebooks = json_encode($array_notebooks_names);
?>