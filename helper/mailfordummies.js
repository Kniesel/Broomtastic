var nodemailer = require('nodemailer');
var config = require('../config.js')

//configuration
var Mailer = function(){

	this.transporter = nodemailer.createTransport(
		{
			host: 'mail.fh-joanneum.at',
			port: 25, //coma in the end does no harm	
		}
	);
}

Mailer.prototype.sendMail = function(email, token, username, callback){
	//send mail
	this.transporter.sendMail(
		{
			from: 'doctor@tardis.gallifrey',
			to: email,
			//to: 'anja.bergmann@edu.fh-joanneum.at',
			//to: 'johannaelisabeth.kirchmaier@edu.fh-joanneum.at',
			subject: 'Broomtastic Registration',
			text: 'To confirm your e-mail address click on the following link: http://' + config.host + ':' + config.port + '/confirm-e-mail?token=' + token + '&user=' + username		
		}, function (err, info){
			if (!err) {
				console.log("[INFO] Successfully sent registration email.");
			} else {
				console.log("[ERROR] Couldn't send registration email: ", err);
			}
			callback(err, info);
		}
	);
}

module.exports = Mailer