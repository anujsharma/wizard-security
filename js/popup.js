//SETTING UP OUR POPUP
//0 means disabled; 1 means enabled;
var popupStatus = 0;
//Loading Email popup
function loadPopup(){
	if(popupStatus==0){
		$("#backgroundPopup").css({
			"opacity": "0.7"
		});
		$("#backgroundPopup").fadeIn("slow");
		$("#popupEmail").fadeIn("slow");				
		popupStatus = 1;
	}
}
//Loading Schedule a demo popup
function loadSchedulePopup(){
	if(popupStatus==0){
		$("#backgroundSchdeulePopup").css({
			"opacity": "0.7"
		});
		$("#backgroundSchdeulePopup").fadeIn("slow");
		$("#popupDemo").fadeIn("slow");
		popupStatus = 1;
	}
}
//Loading Talk in Person popup
function loadTalkinPersonPopup(){
	if(popupStatus==0){
		$("#backgroundTalkinPersonPopup").css({
			"opacity": "0.7"
		});
		$("#backgroundTalkinPersonPopup").fadeIn("slow");
		$("#popupTalkinPerson").fadeIn("slow");
		popupStatus = 1;
	}
}
//Loading Share with Others popup
function loadShareWithOthersPopup(){
	if(popupStatus==0){
		$("#backgroundShareWithOthersPopup").css({
			"opacity": "0.7"
		});
		$("#backgroundShareWithOthersPopup").fadeIn("slow");
		$("#popupShareWithOthers").fadeIn("slow");
		popupStatus = 1;
	}
}
//Disabling Email Pop up
function disablePopup(){
	if(popupStatus==1){
		$("#backgroundPopup").fadeOut("slow");
		$("#popupEmail").fadeOut("slow");
		popupStatus = 0;
	}
}
//Disabling Schedule a Demo Pop up
function disableSchedulePopup(){
	if(popupStatus==1){
		$("#backgroundSchdeulePopup").fadeOut("slow");
		$("#popupDemo").fadeOut("slow");
		popupStatus = 0;
	}
}
//Disabling Talk in Person Pop up
function disableTalkinPersonPopup(){
	if(popupStatus==1){
		$("#backgroundTalkinPersonPopup").fadeOut("slow");
		$("#popupTalkinPerson").fadeOut("slow");
		popupStatus = 0;
	}
}
//Disabling Share With Others Pop up
function disableShareWithOthersPopup(){
	if(popupStatus==1){
		$("#backgroundShareWithOthersPopup").fadeOut("slow");
		$("#popupShareWithOthers").fadeOut("slow");
		popupStatus = 0;
	}
}
//Pop Up Location
function centerPopup(){
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#popupEmail,#popupDemo,#popupTalkinPerson,#popupShareWithOthers").height();
	var popupWidth = $("#popupEmail,#popupDemo,#popupTalkinPerson,#popupShareWithOthers").width();
	//centering
	$("#popupEmail,#popupDemo,#popupTalkinPerson,#popupShareWithOthers").css({
		"position": "absolute",
		"top": windowHeight/2-popupHeight/2,
		"left": windowWidth/2-popupWidth/2		
	});
	
	$("#backgroundPopup,#backgroundSchdeulePopup,#backgroundTalkinPersonPopup,#backgroundShareWithOthersPopup").css({
		"height": windowHeight
	});	
}

$(document).ready(function(){
	
	//Loading Email Pop Up
	$(".email-us").click(function(){		
		centerPopup();		
		loadPopup();
	});	
	//Loading Schedule a Demo Pop Up
	$(".schedule-a-demo").click(function(){		
		centerPopup();
		loadSchedulePopup();
	});	
	//Loading Talk in Person Pop Up
	$(".talk-in-person").click(function(){		
		centerPopup();
		loadTalkinPersonPopup();
	});	
	//Share With Others Pop Up
	$(".share-with-others").click(function(){		
		centerPopup();
		loadShareWithOthersPopup();
	});				
	//Closing Email Pop Up
	$("#email-popup-close-button").click(function(){
		disablePopup();
	});
	//Closing Schedule a Demo Pop Up
	$("#demo-popup-close-button").click(function(){
		disableSchedulePopup();
	});
	//Closing Talk in Person Pop Up
	$("#tip-popup-close-button").click(function(){
		disableTalkinPersonPopup();
	});
	//Closing Share With Others Pop Up
	$("#share-popup-close-button").click(function(){
		disableShareWithOthersPopup();
	});	
	return false;

});