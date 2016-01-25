function deleteUser(){
	console.log("[DEBUG] DeleteUser");
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


function changeEmail(){
	console.log("[DEBUG] DeleteUser");
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