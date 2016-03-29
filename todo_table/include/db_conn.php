<?php
error_reporting(0);
$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name="jtabletestdb";

//$db_host = "localhost";
//$db_user = "newteci3_jin1989";
//$db_pass = "kgj1011989";
//$db_name="newteci3_jtabletestdb";

$con = mysql_connect($db_host,$db_user,$db_pass);
mysql_select_db($db_name, $con);
?>