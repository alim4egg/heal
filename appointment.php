<?php

//Retrieve form data. 
//GET - user submitted data using AJAX
//POST - in case user does not support javascript, we'll use POST instead
$name = ($_GET['name']) ? $_GET['name'] : $_POST['name'];
$email = ($_GET['email']) ? $_GET['email'] : $_POST['email'];
$phone = ($_GET['phone']) ? $_GET['phone'] : $_POST['phone'];
$symptoms = ($_GET['symptoms']) ? $_GET['symptoms'] : $_POST['symptoms'];
$department = ($_GET['department']) ? $_GET['department'] : $_POST['department'];
$month = ($_GET['month']) ? $_GET['month'] : $_POST['month'];
$day = ($_GET['day']) ? $_GET['day'] : $_POST['day'];
$addictional = ($_GET['addictional']) ? $_GET['addictional'] : $_POST['addictional'];

//flag to indicate which method it uses. If POST set it to 1
if ($_POST) $post=1;

//Simple server side validation for POST data, of course, you should validate the email
if (!$name) $errors[count($errors)] = 'Please enter your name.';
if (!$email && !phone) $errors[count($errors)] = 'Please enter your prefered contact method.'; 
if (!$symptoms) $errors[count($errors)] = 'Please enter your symptoms.'; 
if ($department == "Select Department ...") $errors[count($errors)] = 'Please select your department.'; 
if ($month == "Month") $errors[count($errors)] = 'Please enter month of you appointment.'; 
if ($day == "Day") $errors[count($errors)] = 'Please enter day of you appointment.'; 

//if the errors array is empty, send the mail
if (!$errors) {

	//recipient
	$to = '';	
	//sender
	$from = $name . ' <' . $email . '>';
	
	//subject and the html message
	$subject = 'Message from ' . $name . ' (send through the appointment form)';	
	$message = '
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head></head>
	<body>
	<table>
		<tr><td>Name</td><td>' . $name . '</td></tr>';
	
	if ($email) {
		$message .= '<tr><td>Email</td><td>' . $email . '</td></tr>';
	}
	if ($phone) {
		$message .= '<tr><td>Phone</td><td>' . $phone . '</td></tr>';
	}
		
	$message .= '
		<tr><td>Department</td><td>' . $department . '</td></tr>
		<tr><td>Desired date of appointment</td><td>' . $day . ' ' . $month . '</td></tr>
		<tr><td>Symptoms</td><td>' . nl2br($symptoms) . '</td></tr>';
	if ($addictional != '') {
		$message .= '<tr><td>Addictional info</td><td>' . $addictional . '</td></tr>';
	}
	
	$message .= '</table>
	</body>
	</html>';

	//send the mail
	$result = sendmail($to, $subject, $message, $from);
	
	//if POST was used, display the message straight away
	if ($_POST) {
		if ($result) echo 'Thank you! We have received your message.';
		else echo 'Sorry, unexpected error. Please try again later';
		
	//else if GET was used, return the boolean value so that 
	//ajax script can react accordingly
	//1 means success, 0 means failed
	} else {
		echo $result;	
	}

//if the errors array has values
} else {
	//display the errors message
	for ($i=0; $i<count($errors); $i++) echo $errors[$i] . '<br/>';
	echo '<a href="form.php">Back</a>';
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