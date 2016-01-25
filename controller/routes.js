var htmltags = require('../helper/htmltags.js');

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
		//If user is not logged in
		if (!user){
			console.log("[INFO] User not logged in.");
			var user = "Sign in";
			var dropdowncontent = htmltags.signintag;
			var headline = "You are not logged in";
			var content1;
			var content2;

		} else {
			console.log("[INFO] Profile of ", user);
			var user = user;
			var dropdowncontent = htmltags.loggedintag;
			var headline = "Your profile";
			var content1 = "<hr><h2>" + user + " </h2><p class=\"title1\"> " + "chris@beispiel.com</p><br><hr><br><br><br><br>";
			var content2 = htmltags.changeforms;
		}

		this.renderPage(res, user, dropdowncontent, headline, content1, content2);
	},


	renderPage: function(res, user, dropdowncontent, headline, content1, content2){
		res.render('index', {
			lacout: false,
			user: user, 
			dropdowncontent: dropdowncontent,
			headline: headline,
			content1: content1,
			content2: content2
		});
	}

}