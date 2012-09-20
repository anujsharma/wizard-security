// JavaScript Document
/*ToolTip Logic*/
this.tooltip = function(){
	
	xOffset = 10;
	yOffset = 10;		
		
	$("a.app-complexity-heading,a.testing-team-size-heading,a.testing-duration-heading,img.info").hover(function(e){											  
		this.t = this.title;
		this.title = "";									  
		$("body").append("<div id='tooltip'><p>"+ this.t +"</p></div>");
		$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("fast");		
    },
	function(){
		this.title = this.t;		
		$("#tooltip").remove();
    });	
	
};
//Small Icon ToolTips Only
this.smalltooltip = function(){
	
	xOffset = 10;
	yOffset = 10;		

	$("button.application-type,button.app-industry").hover(function(e){											  
		this.t = this.title;
		this.title = "";									  
		$("body").append("<div id='tooltip-small'><p>"+ this.t +"</p></div>");
		$("#tooltip-small")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("fast");		
    },
	function(){
		this.title = this.t;		
		$("#tooltip-small").remove();
    });	

};
 $(document).ready(function () {
	 tooltip();
	 smalltooltip();
	//Tooltips for all 6-9 steps heading	
	var isAppTypeSelected = false; var isAppIndustrySelected = false;	var isAttackTypeActive = false; var isTestingDeliverableActive = false;	var isAppComplexityActive = false;
	var isTestingRegionSelected = false; var isUpdatePriceClicked = false;	
	
	//Attack Types Total Price	
	var at_total= 0;
	
	//Testing Deliverables		
	var td_action_total = 0;
	
	
	var app_complexity = 1;
	var testing_team_size = 0;
	var testingDurationValue = 6;
	
	var sf_testing_team_size = "Medium";
	var sf_app_complexity = "Medium";
	
	//Page View Event Parameters
	var currentURL = String(window.location.href); 
	var pathURI = String(window.document.location.pathname);
	var qs = String(window.location.search);
	var rootURL = location.protocol + "//" + document.domain + "/" + location.pathname.split('/')[1] + "/";	

	var baseURI = pathURI + qs;	/***Request_url_base: By adding path with query string**/
	var cookie_name= readCookie('mkeng_id'); /***Cookie Read***/
	var PageTitle =  String(document.title); /***Page Title***/	
	var ReferringURL = getreferURL(); /***Ref URL***/
	var LeadSource = decodeURIComponent(getURLParams()["ls"]); /***Lead Score***/
	var MarketingCode = decodeURIComponent(getURLParams()["mc"]); /**Marketing Code**/
	
	
	var cookie_name= readCookie('mkeng_id');
	
	var csv_array = new Array();
	var ws_array = new Array();
	
	var base_price = 4325;
	var cumulativeFinalPrice1 = 0; var cumulativeFinalPrice2 = 0;	
	var final_price_p1 = 0; var final_price_p2 = 0;
	
	var appTypeValue;
	var osValue = new Array();
	var appIndustryValue; 
	var testingDeliverablesValue = new Array();
	var attackTypes = new Array();
	
	//Current Domain
	var currentDomain = document.domain;
	
	csv_array.push(cookie_name,PageTitle,currentURL);
	var WizardConversionPoint;
	
	//Adding Key-Value		
	csv_array = {"cookie":cookie_name,"PageTitle":PageTitle,"currentURL":currentURL,"baseURI":baseURI,"ReferringURL":ReferringURL,"LeadSource":LeadSource,"MarketingCode":MarketingCode};
	
	//Page View Event
	$.ajax({        
		type: "POST",
		url: "/sites/all/themes/utest/includes/page-view.php",
		data: {CSVArray : csv_array},			
		success: function(data) {							
			if(!cookie_name)
			{
				createCookie('mkeng_id',data,1826);
				cookie_name = readCookie('mkeng_id');						
				
			}			
		}
	}); 
	
	//Setting Default Time/Size Value for pop up
	$('.testing-duration-value').text(testingDurationValue + ' Projects' );
	
	//App Industry : Roll Over Effects
	$(".application-type").hover(function() {		
			$(this).toggleClass('hovered');
			 $('.application-type').not(this).removeClass('hovered');  		
				
	});
	//Adding Calendar
	$("#datepicker").datepicker();
	//App Type : Toggle Effect
	$(".application-type").click(function() {
		$(this).toggleClass('selected');
	    $('.application-type').not(this).removeClass('selected');		
		isAppTypeSelected = true;		
		_appTypeClicked = $(this).attr('class');	
		
		//Clearing OS Array Values And Clearing all selected styling
		if($(this).hasClass('selected'))
		{		
			osValue = new Array();			
		}		
	
		switch (_appTypeClicked) 
		{
			case 'application-type mobile hovered selected':
			appTypeValue = 'Mobile';
			break;
			
			case 'application-type web hovered selected':
			appTypeValue = 'Web';
			break;
			
			case 'application-type desktop hovered selected':
			appTypeValue = 'Desktop';
			break;
			
		}
		//PopUp Value Setup
		$('.app-type-value').text(appTypeValue);
		
		$('#step-2 #os ul li a').removeClass('selected');			
		
		selectOS(_appTypeClicked);	
	});	
	
	function selectOS(appTypeClicked) {			
		if(isAppTypeSelected == true) {
			$('.step-1-active').addClass('step-1-inactive');
			$('a#app-type-heading').css('color','#0099cc');
				
			if(isUpdatePriceClicked == false)
			{					
				$('#step-2').addClass('active');
			}
			else
			{
				$('#step-2').removeClass('active');
			}
			$('a.os-type-heading').css('color','#0099cc');
		}
		switch(appTypeClicked)
		{
			case 'application-type mobile hovered selected':
				$('#os .mobile').addClass('active');
				$('#os .mobile h3').css('color','#999999');
				$('#os .browsers h3,#os .desktop h3').css('color','#dddddd');
				$('#os .browsers,#os .browsers-right,#os .desktop').removeClass('active');				
				isOSActive = true;			
				break;
				
			case 'application-type web hovered selected':
				$('#os .browsers,#os .browsers-right').addClass('active');	
				$('#os .browsers h3').css('color','#999999');	
				$('#os .mobile h3,#os .desktop h3').css('color','#dddddd');		
				$('#os .desktop,#os .mobile').removeClass('active');
				
				isOSActive = true;				
				break;
				
			case 'application-type desktop hovered selected':
				$('#os .desktop').addClass('active');
				$('#os .desktop h3').css('color','#999999');	
				$('#os .browsers h3,#os .mobile h3').css('color','#dddddd');
				$('#os .browsers,#os .browsers-right,#os .mobile').removeClass('active');
											
				isOSActive = true;				
				break;			
		}		
	}
	//OS selection
	//Desktop
	$("#os .desktop ul li a,#os .mobile ul li a,#os .browsers ul li a,#os .browsers-right ul li a").click(function(){
		if(isOSActive == true) {			
				$(this).toggleClass('selected');			
				$('#step-2').removeClass('active');
				
				if(isUpdatePriceClicked == false)
				{					
					$('#step-3').addClass('active');
				}
				else
				{
					$('#step-3').removeClass('active');
				}	
			
				$('a#app-industry-heading').css('color','#0099cc');
				isOSSelected = true;
				
				if($(this).hasClass('selected'))
				{			       	
					osValue.push(' ' + $(this).text());
				}
				else
				{
	
					osValue.removeByValue($(this).text());
				}
				
				//PopUp Value Setup
				$('.os-value').text(String(osValue));
						
	}	
	});
		
	//App Industry Type : Toggle Effect
	$(".app-industry").click(function() {			
		
		if(isAppTypeSelected == true)
		{	
			$(this).toggleClass('selected');			
			$('.app-industry').not(this).removeClass('selected'); 
			
			isAppIndustrySelected = true;
			appIndustryTypeClicked = $(this).attr('class');
			
			switch (appIndustryTypeClicked) 
			{
				case 'app-industry retail hovered selected':
				appIndustryValue = 'Retail';
				break;
				
				case 'app-industry media hovered selected':
				appIndustryValue = 'Media';
				break;
				
				case 'app-industry travel hovered selected':
				appIndustryValue = 'Travel';
				break;
				
				case 'app-industry social hovered selected':
				appIndustryValue = 'Social';
				break;
				
				case 'app-industry health hovered selected':
				appIndustryValue = 'Health';
				break;
				
				case 'app-industry education hovered selected':
				appIndustryValue = 'Education';
				break;
				
				case 'app-industry financial hovered selected':
				appIndustryValue = 'Financial';
				break;
				
				case 'app-industry gaming hovered selected':
				appIndustryValue = 'Gaming';
				break;
				
				case 'app-industry software hovered selected':
				appIndustryValue = 'Software';
				break;
				
			}
			
			//PopUp Value Setup
			$('.app-industry-value').text(appIndustryValue);
				
				selectAttackTypes(); 			
			}				
		});
	//App Industry : Roll Over Effects
	$(".app-industry").hover(function() {
		if(isAppTypeSelected == true)
		{	
			$(this).toggleClass('hovered');
			 $('.app-industry').not(this).removeClass('hovered');  
		}				
	});

	//Focus Group Deliverables : Selection
	function selectAttackTypes(){
		if(isAppIndustrySelected == true) {						
		
			$('#step-3').removeClass('active');
			
			if(isUpdatePriceClicked == false)
			{					
				$('#step-4').addClass('active');
			}
			else
			{
				$('#step-4').removeClass('active');
			}	
			
			$('#step-4 .attack-type').addClass('active');
			$('a.attack-type-heading').css('color','#0099cc');	
			isAttackTypeActive = true;
		}
	}
	//Attack Types : Toggle Effect
	$("#step-4 .attack-type ul li a").click(function(){
		if(isAttackTypeActive == true) {
			
			$(this).toggleClass('selected');			
			$('#step-4').removeClass('active');
			
			<!--Activating Step 4-->
			if(isUpdatePriceClicked == false)
			{					
				$('#step-5').addClass('active');
			}
			else
			{
				$('#step-5').removeClass('active');
			}
			$('#step-5 .testing-deliverables').addClass('active');
			$('a.testing-deliverables-heading').css('color','#0099cc');	
			isTestingDeliverableActive = true;
			
			at_class = $(this).attr('class');
			
			//Adding Attack Type into collection
			if($(this).hasClass('selected'))
			{			       	
				attackTypes.push(' ' + $(this).text());
			}
			else
			{

				attackTypes.removeByValue($(this).text());
			}
						
			//DataBase Injection Selected
			if(at_class == 'at-database-injection selected')
			{				
				at_total = at_total + 75;
			}
			else if(at_class == 'at-database-injection')
			{
				at_total = at_total - 75;
			}			
			
			//Cross Site Scripting Selected
			if(at_class == 'at-cross-site-scripting selected')
			{			
				at_total = at_total + 50;
			}
			else if (at_class == 'at-cross-site-scripting')
			{
				at_total = at_total - 50;
			}			
			
			//Cross Site Forgery Selected
			if(at_class == 'at-cross-site-forgery selected')
			{
				at_total = at_total + 100;
			}
			else if(at_class == 'at-cross-site-forgery')
			{
				at_total = at_total - 100;
			}
					
			//Broken Authentication Selected
			if(at_class == 'at-broken-authentication selected')
			{
				at_total = at_total + 75;
			}
			else if(at_class == 'at-broken-authentication')
			{
				at_total = at_total - 75;
			}
			
			//Insecure Cryptography Selected
			if(at_class == 'at-insecure-cryptography selected')
			{
				at_total = at_total + 100;
			}
			else if(at_class == 'at-insecure-cryptography')
			{
				at_total = at_total - 100;
			}
						
			//Buffer Overflow Selected
			if(at_class == 'at-buffer-overflow selected')
			{
				at_total = at_total + 100;
			}
			else if(at_class == 'at-buffer-overflow')
			{
				at_total = at_total - 100;
			}		
					
		}
			
	});
	
	//Security Testing Deliverables : Toggle Effect	
	$("#step-5 .testing-deliverables ul li a").click(function(){
		if(isTestingDeliverableActive == true) {
							
			$(this).toggleClass('selected');			
			$('#step-5').removeClass('active');
			
			<!--Activating Both Step 5 and 6-->
			if(isUpdatePriceClicked == false)
			{					
				$('#step-6').addClass('active');
				$('.update-button').addClass('active');
			}
			else
			{
				$('#step-6').removeClass('active');
			}	
			
			$('a.app-complexity-heading').css('color','#0099cc');
			
			
			if($(this).hasClass('selected'))
			{			       	
        		testingDeliverablesValue.push(' ' + $(this).text());				
			}
			else
			{
				testingDeliverablesValue.removeByValue($(this).text());				
			}
			
			//PopUp Value Setup
			$('.testing-deliverables-value').text(String(testingDeliverablesValue));
						
			//getting tce and tcc
			testingDeliverableClicked = $(this).attr('class');						
			isAppComplexityActive = true;
						
			//Testing Deliverables
			 
			//Manual Peneteration Test
			if(testingDeliverableClicked == 'td-manual-peneteration-test selected')
			{				
				td_action_total = td_action_total + 0;
			}
			else if(testingDeliverableClicked == 'td-manual-peneteration-test')
			{
				td_action_total = td_action_total - 0;
			}
			//Auto Vulnerability Scan
			if(testingDeliverableClicked == 'td-auto-vulnerability-scan selected')
			{				
				td_action_total = td_action_total + 2500;
			}
			else if(testingDeliverableClicked == 'td-auto-vulnerability-scan')
			{
				td_action_total = td_action_total - 2500;
			}
			//White Box Testing
			if(testingDeliverableClicked == 'td-white-box-testing selected')
			{				
				td_action_total = td_action_total + 50;
			}
			else if(testingDeliverableClicked == 'td-white-box-testing')
			{
				td_action_total = td_action_total - 50;
			}	
			//Black Box Testing
			if(testingDeliverableClicked == 'td-black-box-testing selected')
			{				
				td_action_total = td_action_total + 100;
			}
			else if(testingDeliverableClicked == 'td-black-box-testing')
			{
				td_action_total = td_action_total - 100;
			}
			//Detailed Vulnerability
			if(testingDeliverableClicked == 'td-detailed-vulnerability-assess selected')
			{				
				td_action_total = td_action_total + 2500;
			}
			else if(testingDeliverableClicked == 'td-detailed-vulnerability-assess')
			{
				td_action_total = td_action_total - 2500;
			}		
						
		}			
		return false;	
	});
	
//Function for removing unchecked elements from Array
Array.prototype.removeByValue = function(val) {
for(var i=0; i<this.length; i++) {
	if(this[i] == val) {
	this.splice(i, 1);
	break;
		}
	}
}	

//App Complexity Slider
 $(".app-complexity-slider" ).slider({
			    animate: true,
                range: "min",
                value: 5,
                min: 1,
                max: 10,
				step: 1,
                
				//this gets a live reading of the value and prints it on the page
                slide: function( event, ui ) {
					if(isAppComplexityActive == false)
					{
						return false;
					}
					else if(isAppComplexityActive == true)
					{											
						$('a.testing-team-size-heading').css('color','#0099cc');						
					
						if(ui.value < '2')
						{							
							$('#app-complexity-slider-result-image').attr('src', 'images/small-complex-app.png');
							app_complexity = -500;
							sf_app_complexity = "Lowest";

						}
						if(ui.value >= '2' && ui.value <'4')
						{							
							$('#app-complexity-slider-result-image').attr('src', 'images/small-complex-app-2.png');
							app_complexity = -250;
							sf_app_complexity = "Low";

						}
						if(ui.value >= '4' && ui.value <'6')
						{							
							$('#app-complexity-slider-result-image').attr('src', 'images/medium-complex-app.png');
							app_complexity = 1;
							sf_app_complexity = "Medium";

						}
						if(ui.value >= '6' && ui.value <'8')
						{						
							$('#app-complexity-slider-result-image').attr('src', 'images/medium-complex-app-2.png');
							app_complexity = 250;
							sf_app_complexity = "High";

						}
						if(ui.value >'8')
						{							
							$('#app-complexity-slider-result-image').attr('src', 'images/high-complex-app.png');
							app_complexity = 500;
							sf_app_complexity = "Highest";
						}
						
						
					}
                },
				
				//this updates the hidden form field so we can submit the data using a form
                change: function(event, ui) { 
                $('#app-complexity-slider-hidden').attr('value', ui.value);
                }               
			
});
//Testing Team Size Slider
 $(".testing-team-size-slider" ).slider({
			    animate: true,
                range: "min",
                value: 5,
                min: 1,
                max: 10,
				step: 1,
                
				//this gets a live reading of the value and prints it on the page
                slide: function( event, ui ) { 
					if(isAppComplexityActive == false) {
						return false;
					}
					else if(isAppComplexityActive == true) {						
						$('a.testing-duration-heading').css('color','#0099cc');	
						
						//Smallest
						if(ui.value < '2') {
							
							$('#testing-team-size-slider-result-image').attr('src', 'images/small-testing-team.png');
							testing_team_size = -500;
							sf_testing_team_size = "Smallest";
						}
						//Smaller
						if(ui.value >= '2' && ui.value <'3') {
							
							$('#testing-team-size-slider-result-image').attr('src', 'images/small-testing-team-2.png');
							testing_team_size = -250;
							sf_testing_team_size = "Smaller";
						}
						//Small
						if(ui.value >= '3' && ui.value <'5') {
							
							$('#testing-team-size-slider-result-image').attr('src', 'images/medium-testing-team.png');
							testing_team_size = -125;
							sf_testing_team_size = "Small";
						}
						//Medium
						if(ui.value >= '5' && ui.value <='6') {
							
							$('#testing-team-size-slider-result-image').attr('src', 'images/medium-testing-team-2.png');
							testing_team_size = 1;
							sf_testing_team_size = "Medium";
						}
						//Large
						if(ui.value >= '6' && ui.value <'8') {
							
							$('#testing-team-size-slider-result-image').attr('src', 'images/medium-testing-team-2.png');
							testing_team_size = 125;
							sf_testing_team_size = "Large";
						}
						//Larger
						if(ui.value >= '8' && ui.value <='9') {
							
							$('#testing-team-size-slider-result-image').attr('src', 'images/medium-testing-team-2.png');
							testing_team_size = 250;
							sf_testing_team_size = "Larger";
						}
						//Largest
						if(ui.value >'9') {
							
							$('#testing-team-size-slider-result-image').attr('src', 'images/large-testing-team.png');
							testing_team_size = 500;
							sf_testing_team_size = "Largest";
						}				
						
						
					}
                },

				//this updates the hidden form field so we can submit the data using a form
                change: function(event, ui) { 
                $('#testing-team-size-slider-hidden').attr('value', ui.value);
                }
			
});
//Testing Duration Slider
 $(".testing-duration-slider" ).slider({
			    animate: true,
                range: "min",
                value: 6,
                min: 1,
                max: 12,
				step: 1,
                
				//this gets a live reading of the value and prints it on the page
                slide: function( event, ui ) {
					if(isAppComplexityActive == false)	{
						return false;
					}
					else if(isAppComplexityActive == true) {						
						$('#step-5').removeClass('active');
											
                   		$( "#testing-duration-slider-result" ).html( ui.value );
						
						//PopUp Value Setup
						$('.testing-duration-value').text(ui.value + ' Projects' );
						
						testingDurationValue = String(ui.value + 'Projects');
											
						switch (ui.value)
						{
							case 1:
							base_price = 5000;						
							break;
							
							case 2:
							base_price = 4900;
							break;
							
							case 3:
							base_price = 4700;
							break;
							
							case 4:
							base_price = 4575;
							break;
							
							case 5:
							base_price = 4450;
							break;
							
							case 6:
							base_price = 4325;
							break;
							
							case 7:
							base_price = 4200;
							break;
							
							case 8:
							base_price = 4100;
							break;
							
							case 9:
							base_price = 4000;
							break;
							
							case 10:
							base_price = 3900;
							break;
							
							case 11:
							base_price = 3800;
							break;
							
							case 12:
							base_price = 3700;
							break;							
						}						
					}
                },
				//this updates the hidden form field so we can submit the data using a form
                change: function(event, ui) { 
                $('#testing-duration-hidden').attr('value', ui.value);
                }
			
});

//Update Price Logic
$(".update-button").click(function() {
	
	if(isUpdatePriceClicked == false)
	{	
		isUpdatePriceClicked = true;		
	}
		
	if(isAppComplexityActive == true) {	
	
	final_price_p1 = Math.round(finalPriceP1(base_price,at_total,td_action_total,testing_team_size,app_complexity));
	final_price_p2 = Math.round(finalPriceP2(base_price,at_total,td_action_total,testing_team_size,app_complexity));
	
	$("p.final-price-range").text("$" + final_price_p1 + " - " + "$" + final_price_p2).hide("fast");
	$("p.final-price-range").text("$" + final_price_p1 + " - " + "$" + final_price_p2).show("slow");
	
	//Sending user Entries to ME -  SF
	var SFdata = 'App Type: ' + appTypeValue + '\nOperating Systems: ' + osValue + '\nApp Industry: ' + appIndustryValue + '\nAttack Types: ' + attackTypes + '\nTesting Deliverables: ' + String(testingDeliverablesValue) + '\nApp Complexity: '+ sf_app_complexity + '\nTest Team Size: ' + sf_testing_team_size + '\nNumber Of Projects: ' + testingDurationValue + '\nPrice Estimate: ' + String(final_price_p1 + '-'+ final_price_p2);
	
	if(cookie_name)
	{	
		//Making an AJAX Call to SF Event
		WizardConversionPoint = "Wizard - Security";	
				
		//Adding Key-Value		
		ws_array = {"cookie":cookie_name,"Description":SFdata,"ConversionPoint":WizardConversionPoint};
		
		//Sales Force Event 
		$.ajax({        
			type: "POST",
			url: "/sites/all/themes/utest/includes/wizard-sf-event",
			data: {WSP : ws_array},			
			success: function(data) {				
		}
		});
	}
	
	
	
	//PopUp Value Setup
	$('.popupEmail-wr-price-range,.popupDemo-wr-price-range,.popupTalkinPerson-wr-price-range,.popupShareWithOthers-wr-price-range').text('$' + final_price_p1 + ' - ' + '$' + final_price_p2 + ' Per Month');		

	}
	else {
		alert('Please select all steps 1-6 to see the price estimate');
	}		
	
});  
//Reset Button Click	
$(".reset-button").bind("click", function() {
	  window.location="./";
  });
//Closing ThickBox
$(".close-button").bind("click", function() {	      	
	  window.location="https://" + currentDomain +"/pricing-usability-testing/thanks";
  });

/*Adding Price range*/  
function finalPriceP1(base_price,at_total,td_action_total,testing_team_size,app_complexity) { 
	
	 base_price = (base_price + at_total + td_action_total + testing_team_size + app_complexity);	
	
	 var cum_price1 = base_price - base_price*0.1;
	 
	 return cum_price1 ;
  }
  
  function finalPriceP2(base_price,at_total,td_action_total,testing_team_size,app_complexity) {
	  	
	 base_price = (base_price + at_total + td_action_total + testing_team_size + app_complexity);
	
	 var cum_price2 = base_price + base_price*0.1;
	 
	 return cum_price2 ;
  }

//Resetting Email Pop up
$("#email-popup-reset-button,#tip-popup-reset-button,#demo-popup-reset-button,#share-popup-reset-button").click(function(){
		clearPopUp();
	}); 

function clearPopUp() {
	$("form :input").val('');	
	return false;
}
//Sending Email : Email Pop up
$('#popup-email-submit').click(function () {
	var email_us_first_name = $('input[name=email_us_first_name]');
	var email_us_last_name = $('input[name=email_us_last_name]');
    var email_us_email = $('input[name=email_us_email]');
	var email_us_company = $('input[name=email_us_company]'); 
	var email_us_subject = $('input[name=email_us_subject]'); 
    var email_us_message = $('textarea[name=email_us_message]');
               
        //organize the data properly
        var data = 'email_us_first_name=' + email_us_first_name.val() +'&email_us_last_name=' + email_us_last_name.val() + '&email_us_email=' + email_us_email.val() + '&email_us_company=' + email_us_company.val() + '&email_us_subject='+ email_us_subject.val() + '&email_us_message=' + email_us_message.val() + '&appTypeValue=' + appTypeValue + '&appIndustryValue=' + appIndustryValue +'&testingDeliverablesValue=' +String(testingDeliverablesValue)  + '&testingDurationValue=' + testingDurationValue + '&priceEstimate=' + String(final_price_p1 + '-'+ final_price_p2);
		
        $('.text').attr('disabled','true');
         
        //start the ajax
        $.ajax({           
            url: "process-email.php",             
            type: "GET",
			data: data,
            cache: false,
            success: function (html) {                            
                if (html==1) {                 
                    //hide the form
                    $('#email-form-wrapper').fadeOut('slow');                
                     
                    //show the success message
                    $('.email-sent-done').fadeIn('slow');
                     
                //if process.php returned 0/false (send mail failed)
                } else alert('Sorry, unexpected error. Please try again later.');              
            }      
        });
        return false;
    });
//Sending Email: On Click of Schedule a Demo
$('#popup-demo-submit').click(function () {
	var demo_us_first_name = $('input[name=demo_us_first_name]');
	var demo_us_last_name = $('input[name=demo_us_last_name]');
    var demo_us_email = $('input[name=demo_us_email]');
	var demo_us_company = $('input[name=demo_us_company]'); 	
    var demo_us_message = $('textarea[name=demo_us_message]');	
	var demo_us_calendar = String($('#datepicker').val());
	var demo_us_time_picker = String($('select#demo_us_time_picker').val());
	var demo_us_timezone_picker = String($('select#demo_us_timezone').val());
	
     //organize the data properly
     var data = 'demo_us_first_name=' + demo_us_first_name.val() +'&demo_us_last_name=' + demo_us_last_name.val() + '&demo_us_email=' + demo_us_email.val() + '&demo_us_company=' + demo_us_company.val() + '&demo_us_message=' + demo_us_message.val() +'&demo_us_calendar=' + demo_us_calendar + '&demo_us_time_picker=' + demo_us_time_picker+ '&demo_us_timezone_picker=' + demo_us_timezone_picker + '&appTypeValue=' + appTypeValue + '&appIndustryValue=' + appIndustryValue +'&testingDeliverablesValue=' +String(testingDeliverablesValue)  + '&testingDurationValue=' + testingDurationValue + '&priceEstimate=' + String(final_price_p1 + '-'+ final_price_p2);
				
        $('.text').attr('disabled','true');
         
        //start the ajax
        $.ajax({           
            url: "process-schedule-demo-email.php",             
            type: "GET",
			data: data,
            cache: false,
            success: function (html) {                            
                if (html==1) {                 
                    //hide the form
                    $('#demo-form-wrapper').fadeOut('slow');                
                     
                    //show the success message
                    $('.demo-email-sent-done').fadeIn('slow');
                     
                //if process.php returned 0/false (send mail failed)
                } else alert('Sorry, unexpected error. Please try again later.');              
            }      
        });
        return false;
}); 	
	
//Sending Email: On Click of Talk in Person
$('#popup-tip-submit').click(function () {
	var tip_us_first_name = $('input[name=tip_us_first_name]');
	var tip_us_last_name = $('input[name=tip_us_last_name]');
    var tip_us_email = $('input[name=tip_us_email]');
	var tip_us_company = $('input[name=tip_us_company]'); 
	var tip_us_subject = $('input[name=tip_us_subject]'); 
    var tip_us_message = $('textarea[name=tip_us_message]');
               
        //organize the data properly
        var data = 'tip_us_first_name=' + tip_us_first_name.val() +'&tip_us_last_name=' + tip_us_last_name.val() + '&tip_us_email=' + tip_us_email.val() + '&tip_us_company=' + tip_us_company.val() + '&tip_us_subject='+ tip_us_subject.val() + '&tip_us_message=' + tip_us_message.val() + '&appTypeValue=' + appTypeValue + '&appIndustryValue=' + appIndustryValue +'&testingDeliverablesValue=' +String(testingDeliverablesValue)  + '&testingDurationValue=' + testingDurationValue + '&priceEstimate=' + String(final_price_p1 + '-'+ final_price_p2);
				
        $('.text').attr('disabled','true');
         
        //start the ajax
        $.ajax({           
            url: "process-tip-email.php",             
            type: "GET",
			data: data,
            cache: false,
            success: function (html) {                            
                if (html==1) {                 
                    //hide the form
                    $('#tip-form-wrapper').fadeOut('slow');                
                     
                    //show the success message
                    $('.tip-sent-done').fadeIn('slow');
                     
                //if process.php returned 0/false (send mail failed)
                } else alert('Sorry, unexpected error. Please try again later.');              
            }      
        });
        return false;
    }); 
	
//Sending Email: On Share With Others
$('#popup-share-submit').click(function () {
	
	var share_us_your_email = $('input[name=share_us_your_email]');
	var share_us_friend_email = $('input[name=share_us_friend_email]');
	var share_us_subject = $('input[name=share_us_subject]');
	var share_us_message = $('textarea[name=share_us_message]');
	
        //organize the data properly
        var data = 'share_us_your_email=' + share_us_your_email.val() +'&share_us_friend_email=' + share_us_friend_email.val() + '&share_us_subject=' + share_us_subject.val() + '&share_us_message=' + share_us_message.val() + '&appTypeValue=' + appTypeValue + '&appIndustryValue=' + appIndustryValue +'&testingDeliverablesValue=' +String(testingDeliverablesValue)  + '&testingDurationValue=' + testingDurationValue + '&priceEstimate=' + String(final_price_p1 + '-'+ final_price_p2);
				
        $('.text').attr('disabled','true');
         
        //start the ajax
        $.ajax({           
            url: "process-share-with-others-email.php",             
            type: "GET",
			data: data,
            cache: false,
            success: function (html) {                            
                if (html==1) {                 
                    //hide the form
                    $('#share-form-wrapper').fadeOut('slow');                
                     
                    //show the success message
                    $('.swo-sent-done').fadeIn('slow');
                     
                //if process.php returned 0/false (send mail failed)
                } else alert('Sorry, unexpected error. Please try again later.');              
            }      
        });
        return false;
    });
	
	//Function to get Cookie
	function readCookie(cookie_name) {
		var cookie_nameEQ = cookie_name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			
			if (c.indexOf(cookie_nameEQ) == 0) return c.substring(cookie_nameEQ.length,c.length);
		}		
		return false;		
	}
	//Function to set Cookie
	function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+";domain=.utest.com; path=/";
	}
	
	//Function to get URL Parameteres (Ref URL, LS, MC)
	function getURLParams()
	{
		var vars = [], hash;
		var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < hashes.length; i++)
		{
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}
		return vars;
	}
	//Function to check refURL
	function getreferURL() {
	  if (!document.referrer) {
		return false;
	  }
	  else {
		return document.referrer;
	  }
	}	

});