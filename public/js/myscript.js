function testfunction() {
	console.log("Ich bin ein Keks. ")
	document.getElementById("notworking").innerHTML = "Sorry - this function doesn't exist yet. We are working on it.";
}

var loginname = ""
var loginpassword = ""
var registername = ""
var registerpassword = ""
var confinepassword = ""
var email = ""

function login(){
	var formData = document.getElementById("loginform").elements;
	loginname = formData[0].value
	loginpassword = formData[1].value
	alert("Username: " + loginname + "\nPassword: " + loginpassword)

	//TODO
	//Create a cookie
}

function register(){
	console.log("Registration")
	var formData = document.getElementById("registerform").elements;
	registername = formData[0].value
	registerpassword = formData[1].value
	confinepassword = formData[2].value
	email = formData[3].value
	if (registerpassword === confinepassword){
		this.mailer = new Mailer()
		this.mailer.sendMail()
		alert("Username: " + registername + "\nPassword: " + registerpassword + "\nEmail: " + email);
		
	} else {
		alert ("Your entered passwords do not match.");
	}
	//TODO
	//Validate Username (nicht doppelt)
	//Create Token
	//Send Registration E-Mail
}