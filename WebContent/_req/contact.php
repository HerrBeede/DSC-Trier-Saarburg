<?php

$result = "Leider ist ein Fehler aufgetreten. Versuchen Sie es später noch einmal oder kontaktieren Sie uns telefonisch!";

$mailTo = "rainer.beck@gmx.de";
$subject = "Kontaktanfrage von Homepage";

$salutation = $_POST['salutation'];
$prename = $_POST['prename'];
$surname = $_POST['surname'];
$phone = $_POST['phone'];
$mailFrom = $_POST['mailFrom'];
$remarks = $_POST['remarks'];

if (empty($phone) && empty($mailFrom)) {
	echo $result;
	return;
}

$from = "From: DSC Trier-Saarburg<no-reply@DSC-Trier-Saarburg>\n";
if (!empty($mailFrom))
	$from .= "Reply-To: " .$mailFrom .= "\n";
	$from .= "Content-Type: text/html\n";

	$message = "Folgende Anfrage wurde von der Homepage gestellt: <br /><br />";
	if (!empty($salutation))
		$message .= $salutation ."<br />";
		if (!empty($prename))
			$message .= $prename ."<br />";
			if (!empty($surname))
				$message .= $surname ."<br />";
				if (!empty($phone))
					$message .= $phone ."<br />";
					if (!empty($email))
						$message .= $mailFrom ."<br />";
						if (!empty($remarks))
							$message .= $remarks;

							$result;
							if (mail($mailTo, $subject, $message, $from))
								$result = "Vielen Dank! Ihre Anfrage wurde versendet!";

								echo $result;
								?>
