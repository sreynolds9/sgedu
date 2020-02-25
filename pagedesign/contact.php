<?php
$pageTitle = 'Contact';
include( 'includes/header.php' );
?>

<div class="wrapper">
	<div class="info">
		<div class="floatleft">
			<h1 class="textpadding">Contact Us</h1>
			<div class="container printnone">
				<form action="/action_page.php">
					<label for="fname">First Name</label>
					<input type="text" id="fname" name="firstname" placeholder="Your name..">
					<label for="lname">Last Name</label>
					<input type="text" id="lname" name="lastname" placeholder="Your last name..">
					<label for="subject">Subject</label>
					<textarea id="subject" name="subject" placeholder="What's on your mind?.." style="height:200px"></textarea>
					<input type="submit" value="Email Us"></a>
				</form>
			</div>
		</div>
		<div class="homeimage2"><img src="images/cyanea_jellyfish.jpg" alt="image of a cyanea jellyfish" height="400px"> </div>
	</div>
	<div class="space"></div>
</div>

<?php include('includes/footer.php'); ?>