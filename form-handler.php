<?php
$name = $_POST['nom'];
$visitor_email =$_POST['email'];
$subject = $_POST['sujet'];
$message = $_POST['message'];

$email_from='tsengatkuo@aforp.eu';

$email_subject='New Form Submission';

$email_body= "Nom Utilisateur : $name.\n".
             "Email Utilisateur : $visitor_email.\n".  
             "Objet : $subject.\n".   
             "Message Utilisateur : $message.\n";

$to = 'tsengatkuo@aforp.eu';

$headers = "From: $email_from \r \n";

$headers.= "Reply-To: $visitor_email \r\n";

mail($to,$email_subject,$email_body,$headers);

header("Location : contact.html");

?>