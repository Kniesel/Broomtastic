function testfunction() {
	console.log("Ich bin ein Keks. ")
	document.getElementById("notworking").innerHTML = "Sorry - this function doesn't exist yet. We are working on it.";
}


function login(){
	var formData = document.getElementById("loginform").elements;
	var loginname = formData[0].value
	var loginpassword = formData[1].value
	alert("Username: " + loginname + "\nPassword: " + loginpassword)

	//TODO
	//Create a cookie
}

function register(){
	
	
	//TODO
	//Validate Username (nicht doppelt)
	//Validate Password (beides mal das gleiche)
	//Create Token
	//Send Registration E-Mail
}