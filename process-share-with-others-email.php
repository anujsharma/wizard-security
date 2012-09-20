<?php
//Retrieve form data.
//GET - user submitted data using AJAX
//POST - in case user does not support javascript, we'll use POST instead
$yourEmail = ($_GET['share_us_your_email']) ? $_GET['share_us_your_email'] : $_POST['share_us_your_email'];
$friendEmail = ($_GET['share_us_friend_email']) ? $_GET['share_us_friend_email'] : $_POST['share_us_friend_email'];

$subject = ($_GET['share_us_subject']) ? $_GET['share_us_subject'] : $_POST['share_us_subject'];
$message = ($_GET['share_us_message']) ? $_GET['share_us_message'] : $_POST['share_us_message'];

$appType = ($_GET['appTypeValue']) ? $_GET['appTypeValue'] : $_POST['appTypeValue'];
$appIndustryValue = ($_GET['appIndustryValue']) ? $_GET['appIndustryValue'] : $_POST['appIndustryValue'];
$testingDeliverablesValue= ($_GET['testingDeliverablesValue']) ? $_GET['testingDeliverablesValue'] : $_POST['testingDeliverablesValue'];
$testingDurationValue = ($_GET['testingDurationValue']) ? $_GET['testingDurationValue'] : $_POST['testingDurationValue'];
$priceEstimate = ($_GET['priceEstimate']) ? $_GET['priceEstimate'] : $_POST['priceEstimate'];

if ($_POST) $post=1;
 
if (!$yourEmail) $errors[count($errors)] = 'Please enter your Email Address.';
if (!$friendEmail) $errors[count($errors)] = 'Please enter your Friend Email Address.';
if (!$subject) $errors[count($errors)] = 'Please enter the subject.';

 
//if the errors array is empty, send the mail
if (!$errors) {	    
    //subject and the html message
    $subject = 'Email From ' . $yourEmail;
    $message = '
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head></head>
    <body>
	<h1>Security Test Planning Wizard</h1>
	<h2>Share With Others</h2>
    <table>      
        <tr><td>Email From</td><td>' . $yourEmail . '</td></tr><br>     
		<tr><td>Subject</td><td>' . $subject . '</td></tr><br>		
        <tr><td>Message</td><td>' . nl2br($message) . '</td></tr><br>		
		<tr><td>App Type</td><td>' . $appType . '</td></tr><br>
		<tr><td>App Industry</td><td>' . $appIndustryValue . '</td></tr><br>
		<tr><td>Testing Deliverables</td><td>' . $testingDeliverablesValue . '</td></tr><br>		
		<tr><td>Number of Projects</td><td>' . $testingDurationValue . '</td></tr><br>
		<tr><td>Price Estimate</td><td>' . $priceEstimate . '</td></tr><br>
    </table>
    </table>
    </body>
    </html>';
 
    //send the mail
    $result = sendmail($friendEmail, $subject, $message, $yourEmail);
     
    //if POST was used, display the message straight away
    if ($_POST) {
        if ($result)
		{
			$pageURL = "/wizard-security";					
			header('Location: '.$pageURL);
		}		
        else {
			echo 'Sorry, unexpected error. Please try again later';
		}
         
    //else if GET was used, return the boolean value so that
    //ajax script can react accordingly
    //1 means success, 0 means failed
    } 
	else {
        echo $result;  
    }

} else {
    //display the errors message
    for ($i=0; $i<count($errors); $i++) echo $errors[$i] . '<br/>';
    echo '<a href="main.php">Back</a>';
    exit;
} 
//Simple mail function with HTML header
function sendmail($friendEmail, $subject, $message, $yourEmail) {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
    $headers .= 'From: '.$yourEmail."\r\n";	
	$headers .= "Bcc: Wizard@uTest.com\r\n";
     
    $result = mail($friendEmail,$subject,$message,$headers);

    if ($result) return 1;
    else return 0;
}
?>