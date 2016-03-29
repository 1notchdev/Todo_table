<html>
  <head>
    <link href="libs/jqueryui/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
    <link href="libs/jtable/themes/jtable.css" rel="stylesheet" type="text/css" />
    <link href="libs/jtable/themes/theme_green.css" rel="stylesheet" type="text/css" />
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    
    <script type="text/javascript" src="libs/jquery-1.10.1.min.js"></script>
    <script>
        var jq1101 = jQuery.noConflict();
    </script>
    <script src="libs/jquery-1.6.4.min.js" type="text/javascript"></script>
    
    <script src="libs/jqueryui/jquery-ui-1.8.16.custom.min.js" type="text/javascript"></script>
    
    <script src="libs/jtable/jquery.jtable.js" type="text/javascript"></script>

    <!--Drag and Drop plugin-->
    <link href="libs/tablednd/tablednd.css" rel="stylesheet" type="text/css" />
    <script src="libs/tablednd/jquery.tablednd.js" type="text/javascript"></script>
    
    <!--NiceScroll plugin-->
    <script src="libs/jquery.nicescroll.min.js"></script>
    
    <!--Analog clock plugin-->
    <script type="text/javascript" src="libs/analogclock/clock2.js"></script>
    <script type="text/javascript" src="libs/analogclock/jQueryRotate.2.2.js"></script>
    
    <!--Filter table plugin-->
    <script type="text/javascript" src="libs/filtertable/jquery.filtertable.js"></script>
    
    <!--Full Calendar plugin-->
    <link href='libs/fullcalendar/fullcalendar.css' rel='stylesheet' />
    <link href='libs/fullcalendar/fullcalendar.print.css' rel='stylesheet' media='print' />
    <script type="text/javascript" src="libs/fullcalendar/fullcalendar.js"></script>
    
    <!--Tooltip plugin-->
    <link rel="stylesheet" type="text/css" href="libs/tooltip/tooltipster.css" />
    <script type="text/javascript" src="libs/tooltip/jquery.tooltipster.js"></script>
    
    
    <script src="js/script.js" type="text/javascript"></script>
    <script>
        $(function() {
            $( "input[type=submit]" ).button();
            $( "input[type=button]" ).button();
        });
    </script>
  </head>
  <body>
    <div style="position: absolute;left: 50%;margin-left: -149px;top: 50%;margin-top: -175px;"><img src="2days2doslogo.png"></div>
<!--    <form id="login_form" method="post" class="ui-form1" action="include/login.php">-->
    <form id="login_form" method="post" class="ui-form1">
        <label for="login_username" style="padding-left: 29px;">Email : </label>
        <input type="text" id="login_username" name="login_username" class="ui-textbox"><br />
        <label for="login_password">Password : </label>
        <input type="password" id="login_password" name="login_password" class="ui-textbox"><br />
        <div class="btn_container">
            <input type="button" value="Login" id="btn_login"> 
<!--            <input type="submit" value="Login" id="btn_login"> -->
            <input type="button" value="Register" id="btn_register">
        </div>
    </form>
    <div id="PopupRegister" title="Create New Account">
        <form id="reg_form" method="post" class="ui-form1">
            <label for="reg_username" >Email : </label>
            <input type="text" id="reg_username" name="reg_username" class="ui-textbox"><br />
            <label for="reg_password">Password : </label>
            <input type="password" id="reg_password" name="reg_password" class="ui-textbox"><br />
            <label for="reg_conpassword">Reenter Password : </label>
            <input type="password" id="reg_conpassword" name="reg_conpassword" class="ui-textbox"><br />
        </form>
    </div>
  </body>
</html>