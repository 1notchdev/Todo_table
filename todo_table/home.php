<?php
error_reporting(0);
include("include/check_login.php");
//session_start();
if ($_SESSION['oauth_token'] && $_SESSION['oauth_token']!=""){
	$jsonevernotebooks = "";
	require("include/evernote/getNotebooks.php");
}
?>
<html>
  <head>
    <link href="libs/jqueryui/jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
    <link href="libs/jtable/themes/jtable.css" rel="stylesheet" type="text/css" />
<!--    <link href="libs/jtable/themes/theme_lightblue.css" rel="stylesheet" type="text/css" />-->
    
    <link href="css/style.css" rel="stylesheet" type="text/css" />
    <link href="css/setting.css" rel="stylesheet" type="text/css" />
    
    <script type="text/javascript" src="libs/jquery-1.10.1.min.js"></script>
    <script>
        var jq1101 = jQuery.noConflict();
        

        var UserThemeColor = '<?php echo $_SESSION["USERTHEME"]; ?>';
        var ScrollColor={
            "green":"#9ecc52",
            "blue":"#0b67cd",
            "grey":"#4e4e4e",
            "lightblue": "#417bb5"
        }
        var path   = "libs/jtable/themes";
        var style   = document.createElement( 'link' );
        style.rel   = 'stylesheet';
        style.type  = 'text/css';
        style.href  = path + '/theme_<?php echo $_SESSION["USERTHEME"]; ?>.css';
        document.getElementsByTagName( 'head' )[0].appendChild( style );
    </script>
    <script src="libs/jquery-1.6.4.min.js" type="text/javascript"></script>
    
    <script src="libs/jqueryui/jquery-ui-1.8.16.custom.min.js" type="text/javascript"></script>
    
    <script src="libs/jtable/jquery.jtable.js" type="text/javascript"></script>

	<!--Drag and Drop plugin-->
    <link href="libs/tablednd/tablednd.css" rel="stylesheet" type="text/css" />
    <script src="libs/tablednd/jquery.tablednd.js" type="text/javascript"></script>
    
    <!--NiceScroll plugin-->
    <script src="libs/jquery.nicescroll.js"></script>
    <!--<script src="libs/jquery.nicescroll.min.js"></script>-->
    
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
    
    <!--Ajax form plugin-->
    <script type="text/javascript" src="libs/ajax_file_upload/jquery.form.js"></script>
    
    <!--easydropdown-->
    <link href='libs/easydropdown/easydropdown.css' rel='stylesheet' />
    <script type="text/javascript" src="libs/easydropdown/jquery.easydropdown.js"></script>

    
    <!--jsOAuth-->
    <script type="text/javascript" src="libs/jsOAuth/jsOAuth-1.3.7.min.js"></script>

    <!--evernote-->
    <script type="text/javascript" src="libs/evernote/evernote-sdk-minified.js"></script>

    <script src="js/evernote.js" type="text/javascript"></script>
    <script src="js/script.js" type="text/javascript"></script>
    
	
  </head>
  <body>
    
	<div class="wrapper">
        <div class="header">
            <div class="logo"><img src="2days2doslogo.png"></div>
            <div class="clock_container">
                <div id="analog-clock"></div>
			    <div class="clock">
				    <ul>
                        <li id="hours">00</li>
                        <li id="point">:</li>
                        <li id="min">00</li>
                        <li id="point">:</li>
                        <li id="sec">00</li>
					    <li><div id="Date"></div></li>
					    
				    </ul>
			    </div>
            </div>
            <div class="calendar_button_container">
                <button id="btnCalendarView" onclick="showCalendarViewDialog()">Calendar View</button>
                <?php
        		if ($_SESSION['oauth_token'] && $_SESSION['oauth_token']!=""){?>
	                
	                <button id="btnGotoEvernote" onclick="getEvernotebooks('<?php echo $jsonevernotebooks; ?>')">Evernote</button>
	            <?php }?>
            </div>
            <div id="top_nav">
                <ul>
                    <li class="nav_first"><a href="#">My Account</a></li>
                    <li><a href="javascript:void(0)" id="btn_setting">Settings</a></li>
                    <li><a href="javascript:void(0)" id="btn_reports">Reports</a></li>
                    <li><a href="javascript:void(0)" id="btn_contacts">Contacts</a></li>
                    <li id="sec"><a href="include/signout.php">Sign Out</a></li>
                </ul>
            </div>
        </div>
        <div class="container">
		    <div class="side_content">
			    <div id="side_nav"></div>
                <a href="#" class="merge" id="btnMerge">Merge</a>
                <!--<button onclick="addToDoDialog()">Add ToDo List</button>-->
		    </div>
		    <div class="center_content">
                <!--<div id="table_header">
                    <ul>
                        <li style="width: 19px;">&nbsp;</li>
                        <li style="width: 162px;">Customer Name</li>
                        <li style="width: 247px;">ToDo</li>
                        <li style="width: 120px;">Phone Number</li>
                        <li style="width: 166px;">Email Address</li>
                        <li style="width: 110px;">Time on ToDo</li>
                        <li style=""></li>
                        <li style=""></li>
                    </ul>
                    
                </div>-->
			    <div id="TableContainer"></div>
                <div id="result"></div>
		    </div>
        </div>
	</div>
    
    <!--******* Dialog ***********--> 
    <div id="SendEmailForm" title="Send Email">
        <!--<p class="validateTips">Email Address is required.</p>-->
        <form class="jtable-dialog-form" method="POST">
            <input type="hidden" id="eTodoId" value="">
            <div class="jtable-input-label">Email Address</div>
            <div class="jtable-input jtable-text-input">
                <input class="" id="reciever" type="text" value="" name="reciever">
            </div>
        </form>
    </div>
    <div id="CalendarViewForm" title="2do's view" style="height:875px">
        <div id='CalendarView'></div>
    </div>
    
    <div id="MergeForm" title="Merge" style="height:875px">
        <form class="jtable-dialog-form" method="POST">
            <div class="jtable-input-label">New Customer Name</div>
            <div class="jtable-input jtable-text-input">
                <input class="" id="txtmergedCustomerName" type="text" value="" name="mergedCustomerName">
            </div>
        </form>
    </div>
    
    <div id="PopupViewMore" title="View More">
        <form class="jtable-dialog-form" method="POST">
            <!--<div id="MoreTextContainer" class="jtable-input-label"></div>-->
            <textarea id="MoreTextContainer" readonly="readonly"></textarea>
        </form>
    </div>
    <!--Setting Dialog-->
    
    <div id="PopupSetting" title="Settings">
        <div class="div_logo_container">
            <div class="input_label">Upload Logo</div>
            <div class="button_container">
                <form id="image_upload_form" action="include/upload.php" class="jtable-dialog-form" method="post" enctype="multipart/form-data">
                    <label for="upload_logo">
                        <input type="file" id="upload_logo" name="upload_file">
                        <img src="images/upload-button.png" id="btn_upload" />
                    </label>
                    <div class="preview_container">
                        <div class="input_label">Preview Logo</div>
                        <img src="#" id="preview_logo_container">
                    </div>
                    <div id="progress">
                        <div id="bar"></div>
                        <div id="percent">0%</div >
                    </div>
                    <div id="message"></div>
                </form>
            </div>
        </div>
        <div class="div_color_container">
            <div class="input_label">Custom Your Colors</div>
            <div class="colorpicker_container">
                <a href="javascript:void(0)" class="btn_colorpicker" data-theme="lightblue" title="Light Blue" style="background-color:#78b1ed"></a>
                <a href="javascript:void(0)" class="btn_colorpicker" data-theme="green" title="Green" style="background-color:#9ecc52"></a>
                <a href="javascript:void(0)" class="btn_colorpicker" data-theme="blue" title="Blue" style="background-color:#0b67cd"></a>
                <a href="javascript:void(0)" class="btn_colorpicker" data-theme="grey" title="Grey" style="background-color:#4e4e4e"></a>
            </div>
        </div>
        <div class="div_taxes_container">
            <div class="input_label">Taxes</div>
            <div class="taxes_container">
                <div class="taxes_header">
                    <div class="cell1"><p>Name<font color="red">*</font></p></div>
                    <div class="cell2"><p>Rate</p></div>
                    <div class="cell3"><p>Number/ID</p></div>
                    <div class="cell4">&nbsp;</div>
                </div>
                <ul class="taxes_list">
                    <li>
                        <div class="cell1"><input type="text" class="tax_name"></div>
                        <div class="cell2"><input type="text" class="tax_rate"> % </div>
                        <div class="cell3"><input type="text" class="tax_number"></div>
                        <div class="cell4"></div>
                    </li>
                </ul>
                <div class="taxes_comment">
                    <div class="cell1"><p>Ex: GST, VAT</p></div>
                    <div class="cell2"><p>Ex: "5"</p></div>
                    <div class="cell3"><p>Ex: "RT710"</p></div>
                    <div class="cell4">&nbsp;</div>
                </div>
                <a href="#" id="btn_add_tax"><img src="images/plus_icon.png">Add another tax</a>
                <div class="rate_container">
                    <div class="input_label">Hourly Rate</div>
                    $<input type="text" class="houly_rate" />/hour
                </div>
            </div>
        </div>
        <div class="div_evernote_container">
        <?php
        if ($_SESSION['oauth_token'] && $_SESSION['oauth_token']!=""){?>
        			<a href="javascript:void(0)" id="btn_disconnectevernote" class="ui-btn-evernote">
		                <img src="images/evernote.png"><span>Connected</span>
		            </a>
        	<?php }else{ ?>
            <a href="javascript:void(0)" id="btn_connectevernote" class="ui-btn-evernote">
                <img src="images/evernote.png"><span>Connect To Evernote</span>
            </a>
            <?php } ?>
        </div>
    </div>
    <!-------------------------------------------------->
    
    <!------Invoice Popup-------->
    <div id="PopupInvoice" title="Invoice">
        <div class="ui-grid-a">
            <div class="ui-block-a ui-left-align">
                <div id="invoice_owner_info">
                    <p>2days2dos</p>
                    <p>808 P. Street</p>
                    <p>Lincoln Nebraska, 68505</p>
                </div>
                <div id="invoice_customer_info">
                    <p>John Smithington</p>
                    <p>123 Front Street</p>
                    <p>Toronto ON A1B2C3</p>
                </div>
                
            </div>
            <div class="ui-block-b ui-right-align">
                <div class="logo"><img src="2days2doslogo.png"></div>
                <div id="table_invoice_result" class="ui-grid-a">
                    <div class="ui-block-a">Invoice #:</div><div class="ui-block-b">0000139</div>
                    <div class="ui-block-a">Date</div><div class="ui-block-b">Auguest 22, 2014</div>
                    <div class="ui-block-a">Amount Due CAD:</div><div class="ui-block-b">$279.99</div>
                </div>
            </div>
        </div>
        <div class="ui-dotline">
        </div>
        <div id="table_invoice_details">
            <table id="table_invoice_task">
                <thead>
                    <tr>
                        <th style="width: 15%">
                            <select id="selectInvoiceTag" class="dropdown">
                                <option value="1">Task</option>
                                <option value="2">Product</option>
                            </select>
                        </th><th style="width: 45%">Time Entry Notes</th>
                        <th style="width: 13%">Rate($)</th>
                        <th style="width: 10%">Hours</th>
                        <th style="width: 13%">Line Total($)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Design</td>
                        <td>Website design mockups</td>
                        <td class="ui-right-align">60.00</td>
                        <td class="ui-center-align">4</td>
                        <td class="ui-right-align">240.00</td>
                    </tr>
                </tbody>
            </table>
            <table id="table_invoice_item">
                <thead>
                    <tr>
                        <th style="width: 15%">Item</th><th style="width: 45%">Description</th><th style="width: 13%">Unit Cost($)</th><th style="width: 10%">Quantity</th><th style="width: 13%">Price($)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>&nbsp;</td>
                        <td>Case of beer</td>
                        <td class="ui-right-align">39.99</td>
                        <td class="ui-center-align">1</td>
                        <td class="ui-right-align">39.99</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr><td colspan="5">NOTES: Thank you!</td></tr>
                </tfoot>
            </table>
            <table id="table_invoice_total">
                <tbody>
                    <tr>
                        <td rowspan="3" style="width: 50%;border-right:2px solid #222">&nbsp;</td>
                        <td class="ui-right-align" style="border-bottom:1px solid #222">
                            <div class="ui-grid-a"><div class="ui-block-a">Subtotal:</div><div class="ui-block-b">279.99</div></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="ui-right-align" style="border-bottom:2px solid #222">
                            <div class="ui-grid-a"><div class="ui-block-a">Total:</div><div class="ui-block-b">279.99</div></div>
                            <div class="ui-grid-a"><div class="ui-block-a">Amount Paid:</div><div class="ui-block-b">-0.00</div></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="ui-right-align" style="background: #aaa">
                            <div class="ui-grid-a"><div class="ui-block-a">Balance Due CAD:</div><div class="ui-block-b">$279.99</div></div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" class="ui-center-align" style="border-top:1px solid #222;height: 40px;vertical-align: middle;">
                            Payment due in 30 days
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
    <!-------------------------------------------------->
    
    
  </body>
</html>