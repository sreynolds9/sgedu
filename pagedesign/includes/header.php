<?php
// NEEDS to come before any HTML is output
session_name( 'sreynolds_wd2_final' ); // make session name unique to this project
session_start();
?>

<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title>Jellyfish
		<?= @$pageTitle ?: 'Jellyfish'; ?>
	</title>
	<meta name="description" content="Jellyfish">
	<meta name="keywords" content="jellyfish, fish, donate">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" href="images/jellyfish-icon.gif" type="image/gif" >
	<link rel="stylesheet" href="styles/jellyfish_mq.css" type="text/css" media="screen">
	<link href="styles/print.css" rel="stylesheet" type="text/css" media="print"/>
</head>

<body>
	<header>
		<div class="logo">
			<h1>Jellyfish</h1>
			<form>
				<p>1.888.555.1234</p>
				<br>
				<input type="text" name="sitesearch" placeholder="Site Search">
				<br>
			</form>
		</div>
		<nav>
			<ul>
				<li><a href="index.php">Home</a>
				</li>
				<li><a href="species.php">Species</a>
				</li>
				<li><a href="faq.php">FAQ</a>
				</li>
				<li><a href="about.php">About</a>
				</li>
				<li><a href="donate.php">Donate</a>
				</li>
				<li><a href="contact.php">Contact</a>
				</li>
			</ul>
		</nav>
	</header>