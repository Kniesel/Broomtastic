var nodemailer = require('nodemailer');

console.log("We configre FH Joanneum (smtp) mail:")

//configuration
var Mailer = function(){

	this.transporter = nodemailer.createTransport(
		{
			host: 'mail.fh-joanneum.at',
			port: 25, //coma in the end does no harm	
		}
	);
}

Mailer.prototype.sendMail = function(){
	//send mail
	this.transporter.sendMail(
		{
			from: 'doctor@tardis.gallifrey',
			to: 'anja.bergmann@edu.fh-joanneum.at',
			//to: 'johannaelisabeth.kirchmaier@edu.fh-joanneum.at',
			subject: 'Broomtastic Registration',
			text: 'To confirm your e-mail address click on the following link: TO BE CONTINUED ...'
		}, function (err, info){
			if (!err) {
				console.log("[INFO] Message id: ", info.messageId)
			} else {
				console.log(err)
			}
		}
	);
}

module.exports = Mailer