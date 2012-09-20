<?php
//Retrieve form data.
//GET - user submitted data using AJAX
//POST - in case user does not support javascript, we'll use POST instead
$firstName = ($_GET['tip_us_first_name']) ? $_GET['tip_us_first_name'] : $_POST['tip_us_first_name'];
$lastName = ($_GET['tip_us_last_name']) ? $_GET['tip_us_last_name'] : $_POST['tip_us_last_name'];
$email = ($_GET['tip_us_email']) ? $_GET['tip_us_email'] : $_POST['tip_us_email'];
$company = ($_GET['tip_us_company']) ? $_GET['tip_us_company'] : $_POST['tip_us_company'];
$subject = ($_GET['tip_us_subject']) ? $_GET['tip_us_subject'] : $_POST['tip_us_subject'];
$message = ($_GET['tip_us_message']) ? $_GET['tip_us_message'] : $_POST['tip_us_message'];

$appType = ($_GET['appTypeValue']) ? $_GET['appTypeValue'] : $_POST['appTypeValue'];
$appIndustryValue = ($_GET['appIndustryValue']) ? $_GET['appIndustryValue'] : $_POST['appIndustryValue'];
$testingDeliverablesValue= ($_GET['testingDeliverablesValue']) ? $_GET['testingDeliverablesValue'] : $_POST['testingDeliverablesValue'];

$testingDurationValue = ($_GET['testingDurationValue']) ? $_GET['testingDurationValue'] : $_POST['testingDurationValue'];
$priceEstimate = ($_GET['priceEstimate']) ? $_GET['priceEstimate'] : $_POST['priceEstimate'];

if ($_POST) $post=1;
 
if (!$firstName) $errors[count($errors)] = 'Please enter your first name.';
if (!$lastName) $errors[count($errors)] = 'Please enter your last name.';
if (!$email) $errors[count($errors)] = 'Please enter your email.';

 
//if the errors array is empty, send the mail
if (!$errors) {
	    
    $to = 'uTest Wizard <Wizard@uTest.com>';
	
    $from = $firstName.' ' .$lastName . ' <' . $email . '>';
     
    //subject and the html message
    $subject = 'Email From ' . $firstName.' ' .$lastName;
    $message = '
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head></head>
    <body>
	<h1>Security Test Planning Wizard</h1>
	<h2>Talk in Person</h2>
    <table>
        <tr><td>First Name</td><td>' . $firstName . '</td></tr><br> 
		<tr><td>Last Name</td><td>' . $lastName . '</td></tr><br> 
        <tr><td>Email</td><td>' . $email . '</td></tr><br> 
        <tr><td>Company</td><td>' . $company . '</td></tr><br> 
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
    $result = sendmail($to, $subject, $message, $from);
     
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
function sendmail($to, $subject, $message, $from) {
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
    $headers .= 'From: ' . $from . "\r\n";
     
    $result = mail($to,$subject,$message,$headers);

     
    if ($result) return 1;
    else return 0;
}
?>