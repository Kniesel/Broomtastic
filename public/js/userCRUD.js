function changeUsername(){
	var username = document.getElementById("dropdownuser").innerHTML;
	var password = document.getElementById("changeUsernamePassword").value;
	var newusername = document.getElementById("changeUsernameUsername").value;
	var data = "username="+username+"&password="+password+"&newusername="+newusername;

	if (!password){
		document.getElementById("changeUsernameFeedback").innerHTML="Please enter your password.";
	} else if(!newusername){
		document.getElementById("changeUsernameFeedback").innerHTML="Please enter your new Username.";
	} else {
		document.getElementById("changeUsernameButton").changeUsernameFeedback = true;
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/changeUsername", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
		document.getElementById("changePasswordButton").disabled = true;
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/changePassword", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
	}else {
		document.getElementById("changeEmailButton").disabled = true;
		var xhttp = new XMLHttpRequest();
		xhttp.open("POST", "/changeEmail", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
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
		xhttp.send(data);
	}

}


