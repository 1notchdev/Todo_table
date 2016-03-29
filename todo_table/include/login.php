<?php

    require_once("db_conn.php");
    
//    define(USERNAME, "it@2dayscrm.com");
//    define(PASSWORD, "N0remote20!5");

    $result = array();

    $login_result = mysql_query("SELECT * FROM users WHERE email='".$_POST['login_username']."' AND password='".md5($_POST['login_password'])."';");
    $row = mysql_fetch_array($login_result);
    
    if ($row && is_array($row)) {
        session_start();
        // session_register('USERNAME');
        $_SESSION['USERNAME']= $row['email'];
        // session_register('USERID');
        $_SESSION['USERID']= $row['id'];
        // session_register('USERTHEME');
        $_SESSION['USERTHEME']= $row['theme'];
        $result['status']='1';
    }
    else {
        $result['status']='0';
        $result['msg'] = 'Please enter valid Email and Password!';
    }
    echo json_encode($result);
    exit();
    //print json_encode($result);
?>