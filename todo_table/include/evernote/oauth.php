<?php
session_start();
if ($_GET['oauth_token'] && $_GET['oauth_token']!=""){
	$_SESSION['oauth_token']= $_GET['oauth_token'];
	$_SESSION['oauth_verifier']= $_GET['oauth_verifier'];
	header('Location: ../../home.php');
}
else {
require ('../oauth_lib/autoload.php');

/** Understanding SANDBOX vs PRODUCTION Environments
 *
 * The Evernote API 'Sandbox' environment -> SANDBOX.EVERNOTE.COM
 *    - Create a sample Evernote account at https://sandbox.evernote.com
 * 
 * The Evernote API 'Production' Environment -> WWW.EVERNOTE.COM
 *    - Activate your Sandboxed API key for production access at https://dev.evernote.com/support/
 * 
 * For testing, set $sandbox to true, for production, set $sandbox to false
 * 
 */
$sandbox = true;

$key      = 'kwoksum90';
$secret   = '7a80a47bbe6fcbde';
$callback = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

$oauth_handler = new \Evernote\Auth\OauthHandler($sandbox);

try {
    $oauth_data  = $oauth_handler->authorize($key, $secret, $callback);

} catch (Evernote\Exception\AuthorizationDeniedException $e) {
    //If the user decline the authorization, an exception is thrown.
    echo "Declined";
}
}