function Evernote(jsonevernotebooks){
	this.JSONEverNotebooks = jsonevernotebooks;
	this.initialPopupNotebooks = function(){
		console.log("aaaaaa");
		console.log(this.JSONEverNotebooks);
		/*if (jq1101("body").find("PopupNotebooks")){
			var popHTML = "";

			jq1101("body").append(popHTML);
		}
		else {
			alert("bbbb");
		}*/
	};

}