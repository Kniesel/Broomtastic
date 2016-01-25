var htmltags = require('../helper/htmltags.js');
var username;
var dropdowncontent;
var headline;
var content1;
var content2;



module.exports = {

	// profile: function (req, res, user){
	// 	//If user is not logged in
	// 	if (!user){
	// 		console.log("[INFO] User not logged in.");
	// 		res.render('index', {
	// 				layout: false, 
	// 				user: "Sign in", 
	// 				dropdowncontent:htmltags.signintag,
	// 				headline: "You are not logged in."
	// 		});
	// 	//If user is logged in
	// 	} else {
	// 		console.log("[INFO] Profile of ", user);
	// 		res.render('index', {
	// 				layout: false, 
	// 				user: user, 
	// 				dropdowncontent:htmltags.loggedintag,
	// 				headline: "Your profile",
	// 				content1: "<hr><h2>" + user + " </h2><p class=\"title1\"> " + "chris@beispiel.com</p><br><hr><br><br><br><br>",
	// 				content2: htmltags.changeforms
	// 		});
	// 	}
	// }


	profile: function (req, res, user){
		console.log("[INFO] Profile of ", user);
		this.resetVariables();
		username = user;
		dropdowncontent = htmltags.loggedintag;
		headline = "Your profile";
		content1 = "<hr><h2>" + user + " </h2><p class=\"title1\"> " + "chris@beispiel.com</p><br><hr><br><br><br><br>";
		content2 = htmltags.changeforms;

		this.renderPage(res);
	},


	notloggedin: function(req, res){
		console.log("[INFO] User not logged in.");
		this.resetVariables();
		username = "Sign in";
		dropdowncontent = htmltags.signintag;
		headline = "You are not logged in";

		this.renderPage(res);
	},


	resetVariables: function(){
		username = null;
		dropdowncontent = null;
		headline = null;
		content1 = null;
		content2 = null;
	},

	renderPage: function(res){
		res.render('index', {
			lacout: false,
			user: username, 
			dropdowncontent: dropdowncontent,
			headline: headline,
			content1: content1,
			content2: content2
		});
	}

}