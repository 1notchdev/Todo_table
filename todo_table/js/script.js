/*Global Variation Declaration*/
var selectedRowsArray = new Array();
var imageExtArray = new Array("jpg","jpeg","png","gif");

$(document).ready(function(){
    display_todolist();
    display_todo("1","Inbox");
    
    $("#btnCalendarView").button({
        icons: {
            primary: "ui-icon-calendar"
        }
    });
    $("#btnGotoEvernote").button({
        icons: {
            primary: "ui-icon-arrowthick-1-e"
        }
    });
    
    $( "#PopupRegister" ).dialog({
        autoOpen: false,
        modal: true,
        show:"fade",
        hide:"fade",
        height: 'auto',
        width: '500px',
        buttons: {
            "Register": function(){
                var $this = $(this);
                var reg_username = $("#reg_username").val();
                var reg_password = $("#reg_password").val();
                if (!$("#reg_username").val() || $("#reg_username").val()=="" || !isValidEmailAddress(reg_username)){
                     popupErrorMsg("Please enter a valid EMAIL!", "#reg_username");
                }
                else if (!$("#reg_password").val() || $("#reg_password").val()==""){
                    popupErrorMsg("Please enter PASSWORD!", "#reg_password");
                }
                else if ($("#reg_password").val()!=$("#reg_conpassword").val()){
                    popupErrorMsg("These passwords don't match.", '#reg_password');
                }
                else {
                    $.ajax({
                        url: "include/register.php",
                        type: "post",
                        data:{username:reg_username,password:reg_password},
                        sync:"false",
                        dataType:"json"
                    }).done(function(result){
                        
                        if (result['status'] == '0'){
                            $("#reg_username").val("");
                            popupErrorMsg(result['msg'], '#reg_username');
                        }
                        else if (result['status'] == '1'){
                            popupErrorMsg(result['msg']);
                            $("#reg_username").val("");
                            $("#reg_password").val("");
                            $("#reg_conpassword").val("");
                            $this.dialog( "close" );
                        }
                        
                    });
                }
            },
            Cancel: function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            
        }
    });
    
    $( "#SendEmailForm" ).dialog({
        autoOpen: false,
        modal: true,
        show:"fade",
        hide:"fade",
        height: 'auto',
        width: '300px',
        buttons: {
            Cancel: function() {
                $( this ).dialog( "close" );
            },
            "Send": function(){
                eTodoID = $("#eTodoId", this).val();
                eReciever = $("#reciever", this).val();
                $.ajax({
                    url: "include/todos_email.php",
                    type: "post",
                    data:{todoID:eTodoID,receiver:eReciever},
                    dataType: "json",
                    sync:"false"
                }).done(function(result){
                    if (result){
                        popupErrorMsg("Email Sent Successfully!");
                        $( "#SendEmailForm" ).dialog( "close" );
                    }
                    else {
                        popupErrorMsg("Sorry,Failed! Please try again");
                    }
                });
            }
        },
        close: function() {
            $("#reciever", this).val( "" ).removeClass( "ui-state-error" );
        }
    });
    
    $( "#CalendarViewForm" ).dialog({
        autoOpen: false,
        modal: true,
        show:"fade",
        hide:"fade",
        width: '884px',
        height: '875px',
        buttons: {
            "Close": function() {
                $( this ).dialog( "close" );
            }
        },
        open: function(){
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            
            $('#CalendarView').fullCalendar({
                theme: true,
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                editable: false,
                events: "include/todos_fullcalendar.php",
                eventRender: function(event, element) {
                    element.attr('title', event.tooltip);
                },
                eventAfterRender: function(event, element) {
                    element.tooltipster({
                        animation: 'grow',
                        theme: '.my-custom-theme'
                    });
                }
            });
        },
        close: function() {
            $("#CalendarView").html("");
        }
    });
    
    $( "#MergeForm" ).dialog({
        autoOpen: false,
        modal: true,
        show:"fade",
        hide:"fade",
        height: 'auto',
        width: '300px',
        buttons: {
            "Merge": function(){
                var newCustomerName = $("#txtmergedCustomerName", this).val();
                if (newCustomerName==""){
                    popupErrorMsg("Please enter the New Customer Name!");
                }
                else {
                    $.ajax({
                        url: "include/todos_merge.php",
                        type: "post",
                        data: {newCustomerName:newCustomerName, selectedRowsArray:selectedRowsArray},
                        dataType: "json",
                        sync:"false"
                    }).done(function(result){
                        result_array = jq1101.parseJSON(result);
                        //alert(result_array['listName']);
                        display_todo(result_array['listId'], result_array['listName'])
                        $( "#MergeForm" ).dialog( "close" );
                    });
                }
            },
            "Close": function() {
                $( this ).dialog( "close" );
            }
        },
        open: function(){
        },
        close: function() {
        }
    });
    
    
    $( "#PopupViewMore" ).dialog({
        autoOpen: false,
        modal: true,
        show:"fade",
        hide:"fade",
        height: 500,
        width: 600,
        buttons: {
            "Close": function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            $( "#PopupViewMore #MoreTextContainer" ).val("");
        }
    });
    
    
    $( "#PopupSetting" ).dialog({
        autoOpen: false,
        modal: true,
        height: 450,
        width: '800px',
        show: {
            effect: "blind",
            duration: 500
        },
        hide: {
            effect: "explode",
            duration: 500
        },
        buttons: {
            "Save": function() {
                var file_path = $("#upload_logo").val();
                
                if (file_path!=""){
                    var file_name_array = file_path.split(".");
                    var file_ext = file_name_array[file_name_array.length-1].toLowerCase();
                    
                    if (imageExtArray.indexOf(file_ext)!=-1){
                        $("#image_upload_form").submit();
                    }
                }
                
                /*Save user color theme*/
                var $selectedtheme = $(".colorpicker_container").find("a.colorpicker_highlighted").data("theme");
                if ($selectedtheme!=undefined){
                    $.ajax({
                        url: "include/set_colortheme.php",
                        type: "post",
                        data:{usertheme:$selectedtheme},
                        dataType: "json",
                        sync:"false"
                    })
                    .done(function(result){
                        $( this ).dialog( "close" );
                        location.reload();
                    })
                    .fail(function( jqXHR, textStatus ) {
                        location.reload();
                        alert( "Request failed: " + textStatus );
                    }); 
                }
                
                /*Save user tax infoes*/
                var taxes_json = {};
                $( "ul.taxes_list li" ).each(function(index){
                    //console.log($(this).find(".tax_name").val());
                    var taxinfo_json={};
                    if ($(this).find(".tax_name").val()){
                        taxinfo_json["tax_name"]= $(this).find(".tax_name").val();
                        taxinfo_json["tax_rate"]= $(this).find(".tax_rate").val();
                        taxinfo_json["tax_number"]= $(this).find(".tax_number").val();
                        taxes_json[index] = taxinfo_json;
                    }
                });
                /*Store Taxes info to server*/
                $.ajax({
                    url: "include/taxes_action.php",
                    type: "post",
                    data:{action:"add",taxes_info:taxes_json},
                    dataType: "json",
                    sync:"false"
                })
                .done(function(result){
                    $( this ).dialog( "close" );
                    location.reload();
                })
                .fail(function( jqXHR, textStatus ) {
                    location.reload();
                    alert( "Request failed: " + textStatus );
                });
                
                /*Save user hourly rate*/
                var $hourlyrate = $("div.rate_container input.houly_rate").val();
                if ($hourlyrate){
                    $.ajax({
                        url: "include/rate_action.php",
                        type: "post",
                        data:{action:"add",hourly_rate:$hourlyrate},
                        dataType: "json",
                        sync:"false"
                    })
                    .done(function(result){
                        $( this ).dialog( "close" );
                        location.reload();
                    })
                    .fail(function( jqXHR, textStatus ) {
                        location.reload();
                        alert( "Request failed: " + textStatus );
                    }); 
                }
            },
            "Close": function() {
                $( this ).dialog( "close" );
            }
        },
        create: function() {
            //$(this).css("maxHeight", 300);        
        },
        open: function(){
            $("a[data-theme='"+UserThemeColor+"']").addClass("colorpicker_highlighted");
            $.ajax({
                url: "include/taxes_action.php",
                type: "post",
                data:{action:"get"},
                sync:"false"
            })
            .done(function(result){
                var taxes_info = $.parseJSON(result);
                var taxHTML = "";
                $.each(taxes_info, function(index, itemData){
                    taxHTML += '<li><div class="cell1"><input type="text" class="tax_name" value="'+itemData['tax_name']+'"></div><div class="cell2"><input type="text" class="tax_rate" value="'+itemData['tax_rate']+'"> % </div><div class="cell3"><input type="text" class="tax_number" value="'+itemData['tax_number']+'"></div><div class="cell4"><a href="#" class="btn_del_tax"><img src="images/minus_icon.png"></a></div></li>';
                    $("ul.taxes_list").html(taxHTML);
                    
                });
            })
            .fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });
            
            /*Get user hourly rate*/
            $.ajax({
                url: "include/rate_action.php",
                type: "post",
                data:{action:"get"},
                sync:"false"
            })
            .done(function(result){
                var hourly_rate = $.parseJSON(result);
                $("div.rate_container input.houly_rate").val(hourly_rate['hourly_rate']);
                
            })
            .fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });
            
            var options = { 
                beforeSend: function(){
                    //$("#progress").show();
                    //clear everything
                    $("#bar").width('0%');
                    $("#message").html("");
                    $("#percent").html("0%");
                },
                uploadProgress: function(event, position, total, percentComplete){
                    $("#bar").width(percentComplete+'%');
                    $("#percent").html(percentComplete+'%');
                },
                success: function() {
                    $("#bar").width('100%');
                    $("#percent").html('100%');
                },
                complete: function(response) {
                    $("#upload_file").val("");
                    //$('#preview_uploaded_image').attr('src','images/click_here_new.png');
                    $("#progress").fadeOut("slow");
                    result = $.parseJSON(response.responseText);
                    if (result['error']){
                        $("#message").html("<font color='red'>"+result['error']+"</font>");
                    }
                },

                error: function(){
                    $("#message").html("<font color='red'> ERROR: unable to upload files</font>");
                }

            };

            $("#image_upload_form").ajaxForm(options);

        },
        close: function() {
            
        }
    });  
    
    
    /*Initialize Invoice Popup*/
    
    $( "#PopupInvoice" ).dialog({
        autoOpen: false,
        modal: true,
        height: 800,
        width: '800px',
        show: {
            effect: "fade",
            duration: 500
        },
        hide: {
            effect: "fade",
            duration: 500
        },
        buttons: {
            "PDF": function() {
                
            },
            "Send": function() {
                
            },            
            "Save": function() {
                
            },
            "Close": function() {
                $( this ).dialog( "close" );
            }
        },
        create: function() {
            
        },
        open: function(){

        },
        close: function() {
            
        }
    });  
    
    /***************Analog Clock******************/
    
    var config = {
                
            /*the name of the div containing the clock*/
            divId: "analog-clock",
                    
            /*set to false if you don't want to use the second hand*/        
            useSecondHand: "true",
            
            /*width and height of the clock*/
            clockWidthAndHeight: "75",
            
            /*location of the images*/
            clockFaceImg: "images/clockBg.png",
            hourHandImg: "images/hourHand.png",
            minuteHandImg: "images/minuteHand.png",
            secondHandImg: "images/secondHand.png", 
            /*location of the high res images for retina display*/
            clockFaceHighResImg: "images/clockBgHighRes.png",
            hourHandHighResImg: "images/hourHandHighRes.png",
            minuteHandHighResImg: "images/minuteHandHighRes.png",
            secondHandHighResImg: "images/secondHandHighRes.png", 
            
            /*Set true to make hand move at steady speed*/
            smoothRotation: "false",
            
            /*speed of the second hand. Lower is faster. */
            /*Must be under 1000. */
            /*If smooth rotation is true, this does nothing.*/
            secondHandSpeed: "100"
                            
        };
        
        var myAnalogClock = new AnalogClock(config);
    
    /********************************************/
    

    /***************Clock******************/
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
    var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    // Create a newDate() object
    var newDate = new Date();
    // Extract the current date from Date object
    newDate.setDate(newDate.getDate());
    // Output the day, date, month and year    
    $('#Date').html(dayNames[newDate.getDay()] + " " + monthNames[newDate.getMonth()] + ' ' + newDate.getDate() + ' ' +  newDate.getFullYear());

    setInterval( function() {
        // Create a newDate() object and extract the seconds of the current time on the visitor's
        var seconds = new Date().getSeconds();
        // Add a leading zero to seconds value
        $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
        },1000);
        
    setInterval( function() {
        // Create a newDate() object and extract the minutes of the current time on the visitor's
        var minutes = new Date().getMinutes();
        // Add a leading zero to the minutes value
        $("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
        },1000);
        
    setInterval( function() {
        // Create a newDate() object and extract the hours of the current time on the visitor's
        var hours = new Date().getHours();
        // Add a leading zero to the hours value
        $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
        }, 1000);

    /*setTimeout(function(){
        $(".clock").fadeIn("slow");
    },1000);*/

    /**************************************************/
});

function _display_todo(list_id,list_name){
    
    $('#TableContainer').jtable({
        title: list_name,
        columnResizable: false,
        sorting: true,
        selecting: true, //Enable selecting
        multiselect: true, //Allow multiple selecting
        selectingCheckboxes: true, //Show checkboxes on first column
        selectOnRowClick: false,
        actions: {
            listAction: 'include/todos_action.php?action=list&list_id='+list_id,
            createAction: 'include/todos_action.php?action=create', 
            updateAction: 'include/todos_action.php?action=update', 
            deleteAction: 'include/todos_action.php?action=delete'
        },
        fields: {
            PersonId: {
                key: true,
                create: false,
                edit: false,
                list: false,
                sorting: false
            },
            ListId: {
                create: false,
                edit: false,
                list: false,
                sorting: false
            },
            Name: {
                title: 'Customer Name',
                width: '19%',
                sorting: false
            },
            ToDo: {
                title: '2do',
                width: '30%',
                type: 'textarea',
                sorting: false
            },
            PhoneNum: {
                title: 'Phone Number',
                width: '15%',
                sorting: false
            },
            EmailAddr: {
                title: 'Email Address',
                width: '20%',
                sorting: false
            },
            
            TimeonToDo: {
                title: 'Total Hours',
                width: '15%',
                sorting: false
            },
            ListId: {
                title: '2do List',
                options: "include/todolist_action.php?action=foredit",
                list: false,
                create:true,
                edit:true,
                sorting: false
            },
            DueDate: {
                title: 'Due Date',
                type:'date',
                list: false,
                create:true,
                edit:true,
                sorting: false
            },
            
            orderNum: {
                create: false,
                edit: false,
                list: false,
                sorting: false
            },
        },
        selectionChanged: function () {
            //Get all selected rows
            var $selectedRows = $('#TableContainer').jtable('selectedRows');
            selectedRowsArray = [];

            //$('#SelectedRowList').empty();
            if ($selectedRows.length > 0) {
                //Show selected rows
                $selectedRows.each(function () {
                    var record = $(this).data('record');
                    selectedRowsArray.push(record.PersonId);
                });
            } else {
                //No rows selected
                //popupErrorMsg("No rows selected");
            }
        },
    });

    //Load person list from server
    $('#TableContainer').jtable('load',{},function(){
        $(".jtable").tableDnD({
            onDrop: function(table, row) {
                var rows = table.tBodies[0].rows;
                var obj = '{';
                
                for (var i=0; i<rows.length; i++) {
                    var tmp = i+1;
                    if (tmp==rows.length) {
                        obj += '"'+tmp+ '":"'+$(rows[i]).attr("data-record-key")+'"';
                    }
                    else {
                        obj += '"'+tmp+ '":"'+$(rows[i]).attr("data-record-key")+'",';
                    }
                    
                }
                obj += '}';
                lotID_JSON = eval('(' + obj + ')');
                $.ajax({
                    url: "include/todos_ordernum.php",
                    type: "post",
                    data:{lotsIDJSON:lotID_JSON},
                    dataType: "json",
                    sync:"false"
                }).done(function(result){
                    
                });
                
            }
        });
        $(".jtable-main-container").niceScroll({cursorborder:"",cursorcolor:ScrollColor[UserThemeColor],boxzoom:false});
        $(".jtable-main-container").getNiceScroll().resize();
        $('.jtable').filterTable();
    });
    
    $('#TableContainer .jtable-title .jtable-title-text').html(list_name);

}


function display_todo(list_id, list_name){
    list_name = list_name.replace("_","'");
    if (!list_id){
        $.ajax({
            url: "include/todolist_action.php",
            type: "post",
            data:{action:'getFirstId'},
            dataType: "json",
            sync:"false"
        }).done(function(result){
            first_info = $.parseJSON(result);
            _display_todo(first_info['list_id'],first_info['list_name']);
        });
    }
    else {
        _display_todo(list_id,list_name);
    }
}

function display_todolist(){
    $.ajax({
        url: "include/todolist_action.php"
    }).done(function(result){
        list_arr = $.parseJSON(result);
        var insertHTML = "";
        //var insertHTML = "<a href='javascript:void(0)' onclick='display_todo("+'"I"'+","+'"Inbox"'+")'>Inbox</a><a href='javascript:void(0)' onclick='display_todo("+'"C"'+","+'"Right Now!"'+")'>Right Now!</a>";
        $.each(list_arr, function(index, itemData){
            var rep_listname = itemData['list_name'].replace("'","_");
            insertHTML += "<a href='javascript:void(0)' onclick='display_todo("+'"'+itemData['list_id']+'"'+","+'"'+rep_listname+'"'+")'>"+itemData['list_name']+"("+itemData["counter"]+")</a>";
        });
        //insertHTML += "<a href='javascript:void(0)' onclick='display_todo("+'"A"'+","+'"All ToDos"'+")'>"+"All ToDos"+"</a>";
        $('#side_nav').html(insertHTML);
    })
    .fail(function(){
        alert("fail")
    });
}

function showCalendarViewDialog(){
    $( "#CalendarViewForm" ).dialog( "open" );
}

function popupErrorMsg(errorMsg, focusObjSelector){
    var $body = $('body');
    if ($body.find('#PopupError').attr("id")!=undefined){
        $body.find('#PopupError').remove();
    }
    var PopupErrorHTML = '<div id="PopupError" title="Error"><form class="jtable-dialog-form" method="POST"><div id="errorMsg" class="jtable-input-label errorMsg"></div></form></div>';
    $body.append(PopupErrorHTML);
    initPopupErrorMsg(focusObjSelector);
    
    $( "#PopupError #errorMsg" ).html(errorMsg)
    $( "#PopupError" ).dialog( "open" );
}
function initPopupErrorMsg(focusObjSelector){
    $( "#PopupError" ).dialog({
        autoOpen: false,
        modal: true,
        show:"fade",
        hide:"fade",
        height: 'auto',
        width: '300px',
        buttons: {
            "Close": function() {
                $( this ).dialog( "close" );
            }
        },
        close: function() {
            $( "#PopupError #errorMsg" ).html("");
            $(focusObjSelector).focus();
        }
    });
}

jq1101(document).on("click","a#btnMerge", function(){
    if (typeof selectedRowsArray !== 'undefined' && selectedRowsArray.length > 1){
        $( "#MergeForm" ).dialog( "open" );
    }
    else {
        popupErrorMsg("Please select at least 2 rows to merged!");
    }
    
});

jq1101(document).on("click",".jtable-more-command-button", function(e){
    e.preventDefault();
    e.stopPropagation();
    //alert($(this).data("info"));
    
    $( "#PopupViewMore #MoreTextContainer" ).val($(this).data("info"))
    $( "#PopupViewMore" ).dialog( "open" );
    
});


jq1101(document).on("click", "#btn_setting", function(e){
    e.stopPropagation();
    e.preventDefault();
    $( "#PopupSetting" ).dialog( "open" );
});

jq1101(document).on("change", "#upload_logo", function(e){
    var file_path = $(this).val();
    
    if (file_path==""){
        //popupErrorMsg("Please choose the image file!");
        //return;
    }
    var file_name_array = file_path.split(".");
    var file_ext = file_name_array[file_name_array.length-1].toLowerCase();
    
    if (imageExtArray.indexOf(file_ext)==-1){
        popupErrorMsg("Please choose the image file!");
        $("div.preview_container").fadeOut();
        return true;
    }
    uploadedImageURL(this,"preview_logo_container");
    
    $("div.preview_container").slideDown();
    //$("#preview_logo_container").attr("src",file_path);
    //$("#image_upload_form").submit();
    
});

jq1101(document).on("click", "#btn_register", function(e){
    e.stopPropagation();
    e.preventDefault();
    var $regbtn = $(this);
    $( "#PopupRegister" ).dialog( "open" );
});

jq1101(document).on("click","#btn_login", function(e){
    var login_username = $("#login_username").val();
    var login_password = $("#login_password").val();
    if (!login_username || login_username==""){
         popupErrorMsg("Please enter USERNAME!","#login_username");
    }
    else if (!login_password || login_password==""){
        popupErrorMsg("Please enter PASSWORD!", "#login_password");
    }
    else {
        $.ajax({
            url: "include/login.php",
            type: "post",
            data:{login_username:login_username,login_password:login_password},
            sync:"false",
            dataType:"json"
        }).done(function(result){
            if (result['status'] == '0'){
                $("#login_password").val("");
                popupErrorMsg(result['msg'],'#login_username');
            }
            else if (result['status'] == '1'){
                $("#login_username").val("");
                $("#login_password").val("");
                document.location.href = "home.php";
            }
            
        });
    }
});

jq1101(document).on("click", "#btn_add_tax", function(e){
    e.stopPropagation();
    e.preventDefault();
    var taxHTML = '<li><div class="cell1"><input type="text" class="tax_name"></div><div class="cell2"><input type="text" class="tax_rate"> % </div><div class="cell3"><input type="text" class="tax_number"></div><div class="cell4"><a href="#" class="btn_del_tax"><img src="images/minus_icon.png"></a></div></li>';
    $(taxHTML).appendTo(".taxes_list").fadeIn();
});

jq1101(document).on("click", ".btn_del_tax", function(e){
    e.stopPropagation();
    e.preventDefault();
    var $delbtn = $(this);
    $delbtn.parents("li").remove();
});

jq1101(document).on("click", ".btn_colorpicker", function(e){
    e.stopPropagation();
    e.preventDefault();
    $(this).parent().find(".btn_colorpicker").removeClass("colorpicker_highlighted");
    $(this).addClass("colorpicker_highlighted");
    
    //alert($(this).data("theme"));
});
jq1101(document).on("click", "#btn_connectevernote", function(){
    // var evernoteobj = new Evernote();
    // evernoteobj.AuthforEvernote();
    window.open("include/evernote/oauth.php","_self");
    
})

function getEvernotebooks(jsonevernotebooks){
	var evernoteobj = new Evernote(jsonevernotebooks);
	evernoteobj.initialPopupNotebooks();

}

function setPriorityNum(row_id, prioritynum){
    
    $.ajax({
        url: "include/todos_prioritynum.php",
        type: "post",
        data:{id:row_id,prioritynum:prioritynum},
        dataType: "json",
        sync:"false"
    }).done(function(result){
        
    });
}

function uploadedImageURL(input, preview_id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //$('#'+preview_id).css('display', 'block');
            $('#'+preview_id).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}


/*function addToDoDialog(){
    $( "#AddTodoListForm" ).dialog();
}
function addToDoList(){
    var listname = $( "#AddListName" ).val();
    if (listname){
        $.ajax({
            url: "include/todolist_action.php",
            type: "post",
            data:{action:'add',listname:listname},
            sync:"false"
        }).done(function(result){
            if (result){
                display_todolist();
                $( "#AddTodoListForm" ).dialog( "close" );
            }
            else {
                alert("Sorry, Insert Failed! Please Try Again!");
            }
        });
    }
    else {
        alert("Please enter ListName!");
    }
}*/