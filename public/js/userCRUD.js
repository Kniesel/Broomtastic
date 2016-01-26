function register(){
	var username = document.getElementById("registername").value;
	var password = document.getElementById("registerpassword").value;
	var password2 = document.getElementById("registerpassword2").value;
	var email = document.getElementById("registeremail").value;
	var data = "username=" + username + "&password=" + password + "&password2=" + password2 + "&email=" + email;

	document.getElementById("registerFeedback").innerHTML = "Validating input ... ";

	if(!username || !password || !password2 || !email){
		document.getElementById("registerFeedback").innerHTML = "Please fill in ALL fields.";
	} else if (username.length < 4 || username.length > 20){
		document.getElementById("registerFeedback").innerHTML = "Your username has to have between 4 and 20 characters.";
	} else if (password !== password2){
		document.getElementById("registerFeedback").innerHTML = "Your entered passwords don't match.";
	} else {
		document.getElementById("registerFeedback").innerHTML = "Registration running ... <br><br> This might take a minute. Please be patient. :)";
		document.getElementById("registerButton").disabled = true;
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/register", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.onreadystatechange = function(){
			if(xhttp.readyState == 4 && xhttp.status == 200){
				document.getElementById("registerFeedback").innerHTML = xhttp.responseText;
				document.getElementById("registerButton").disabled = false;
			}
		}
		xhttp.send(data);
	}
}


function changeUsername(){
	var username = document.getElementById("dropdownuser").innerHTML;
	var password = document.getElementById("changeUsernamePassword").value;
	var newusername = document.getElementById("changeUsernameUsername").value;
	var data = "username="+username+"&password="+password+"&newusername="+newusername;

	if (!password){
		document.getElementById("changeUsernameFeedback").innerHTML = "Please enter your password.";
	} else if(!newusername){
		document.getElementById("changeUsernameFeedback").innerHTML = "Please enter your new Username.";
	} else if(newusername.length < 4 || newusername.length > 20){
		document.getElementById("changeUsernameFeedback").innerHTML = "Your new username has to have between 4 and 20 characters."
	} else {
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/changeUsername", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.onreadystatechange = function() {
			document.getElementById("changeUsernameButton").disabled = true;
			if (xhttp.readyState == 4 && xhttp.status == 200){
				document.getElementById("changeUsernameFeedback").innerHTML = xhttp.responseText;
				if (xhttp.responseText === "Successfully changed username."){
					document.getElementById("dropdownuser").innerHTML = newusername;
				}
				document.getElementById("changeUsernameButton").disabled = false;
			}
		}
		xhttp.send(data);
	}
}


function changePassword(){
	var username = document.getElementById("dropdownuser").innerHTML;
	var password = document.getElementById("changePasswordPassword").value;
	var newpassword = document.getElementById("changePasswordNewPassword").value;
	var newpassword2 = document.getElementById("changePasswordNewPassword2").value;
	var data = "username="+username+"&password="+password+"&newpassword="+newpassword;

	if (!password){
		document.getElementById("changePasswordFeedback").innerHTML="Please enter your password.";
	} else if(!newpassword){
		document.getElementById("changePasswordFeedback").innerHTML="Please enter your new password.";
	} else if (!newpassword2){
		document.getElementById("changePasswordFeedback").innerHTML="Please confirm your new password.";
	} else if (newpassword !== newpassword2){
		document.getElementById("changePasswordFeedback").innerHTML="Your entered passwords do not match.";
	} else {
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/changePassword", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.onreadystatechange = function() {
			document.getElementById("changePasswordButton").disabled = true;
			if (xhttp.readyState == 4 && xhttp.status == 200){
				document.getElementById("changePasswordFeedback").innerHTML = xhttp.responseText;
				document.getElementById("changePasswordButton").disabled = false;
			}
		}
		xhttp.send(data);
	}
}


function changeEmail(){
	var username = document.getElementById("dropdownuser").innerHTML;
	var password = document.getElementById("changeEmailPassword").value;
	var email = document.getElementById("changeEmailEmail").value;
	var data = "username="+username+"&password="+password+"&email="+email;

	if (!password){
		document.getElementById("changeEmailFeedback").innerHTML="Please enter your password."
	} else if(!email){
		document.getElementById("changeEmailFeedback").innerHTML="Please enter your new email address."
	} else {
		document.getElementById("changeEmailFeedback").innerHTML = "Sending registration email ... <br><br> This might take a minute. Please be patient. :)";
		document.getElementById("changeEmailButton").disabled = true;
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/changeEmail", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.onreadystatechange = function() {
			document.getElementById("changeEmailButton").disabled = true;
			if (xhttp.readyState == 4 && xhttp.status == 200){
				document.getElementById("changeEmailFeedback").innerHTML = xhttp.responseText;
				document.getElementById("changeEmailButton").disabled = false;
			}
		}
		xhttp.send(data);
	}

}


function deleteUser(){
	var username = document.getElementById("dropdownuser").innerHTML;
	var password = document.getElementById("deletePassword").value;
	var data = "username="+username+"&password="+password;

	if (!password){
		document.getElementById("deleteFeedback").innerHTML="Please enter your password."
	} else {
		document.getElementById("deleteButton").disabled = true;
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/deleteUser", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.onreadystatechange = function() {
			document.getElementById("deleteButton").disabled = true;
			if (xhttp.readyState == 4 && xhttp.status == 200){
				document.getElementById("deleteFeedback").innerHTML = xhttp.responseText;
				document.getElementById("deleteButton").disabled = false;
			}
		}
		xhttp.send(data);
	}

}


