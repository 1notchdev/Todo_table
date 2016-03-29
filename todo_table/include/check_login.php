<?php 
session_start();
if(!isset($_SESSION['USERNAME']) && $_SESSION['USERNAME']=="" && !isset($_SESSION['USERID']) && $_SESSION['USERID']=="")
{
    header("location:index.php");
    exit();
}
?>