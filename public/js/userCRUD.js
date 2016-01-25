function deleteUser(){
	console.log("[DEBUG] DeleteUser");
	var username = document.getElementById("dropdownuser").innerHTML;
	var password = document.getElementById("deletePassword").value;

	console.log("[DEBUG] Username:" , username);
	console.log("[DEBUG] Password:" , password);

	if (!password){
		document.getElementById("deleteFeedback").innerHTML="Please enter your password."
	} else {
		document.getElementById("deleteButton").disabled = true;
		var xhttp = new XMLHttpRequest();
		xhttp.open("DELETE", "/users", true);
		xhttp.send(password);
	}


}