module.exports = {


	'signintag':'<div class=\"dropdown-content\"><form action=\"/login\" method=\"post\" id=\"loginform\"><p>Username</p><input class=\"inputforms\" type=\"text\" name=\"username\" placeholder=\"username\" required><br><p>Password</p><input class=\"inputforms\" type=\"password\" name=\"password\" placeholder=\"password\" required><input class=\"inputforms\" type=\"submit\" value=\"Login\"><a class=\"inputforms\" href=\"/register\">Register</a></form></div>',

	'loggedintag':'<div class=\"dropdown-content\"><form action=\"/logout\" method=\"post\" id=\"logoutform\"><input class=\"inputforms\" type=\"submit\" value=\"Logout\"></form><form action=\"/profile\" method=\"post\"><input class=\"inputforms\" type=\"submit\" value=\"Your profile\"></form></div>',

	'registerform':'<form action=\"/register\" method=\"post\" id=\"registerform\"><p class=\"title1\">Username</p><input class=\"registerinput\" type=\"text\" name=\"username\" placeholder=\"username\" required><br><p class=\"title1\">Password</p><input class=\"registerinput\" type=\"password\" name=\"password\" placeholder=\"password\" required><br><p class=\"title1\">Enter password again</p><input class=\"registerinput\" type=\"password\" name=\"password2\" placeholder=\"repeat password\" required><br><p class=\"title1\">E-Mail-Address (don\'t cheat, we will send you a registration e-mail!)</p><input class=\"registerinput\" type=\"email\" name=\"email\" placeholder=\"email address\" required><br><input class=\"registerinput\" type=\"submit\" value=\"Register\"></form>',

	'productfilter':'<p class=\"title1\">FILTER BY</p><p class=\"title1 title2\">Category</p><form action=\"/products\" method=\"post\" class=\"filtercontent\" name=\"tabledata\"> <select name=\"category\"><option value=\"all\">Show all categories</option> <option>Balls</option> <option>Books</option> <option>Brooms</option> <option>Clothing</option></select><input type=\"submit\" value=\"Okay\"></form> ',

	'notworking':'<p id=\"notworking\"> </p>',

	'changeUsernameForm':'<p class=\"title1\">Change Username</p><br><p id=\"changeUsernameFeedback\"></p><input class=\"registerinput\" type=\"text\" id=\"changeUsernameUsername\" placeholder=\"username\" required><br><input class=\"registerinput\" type=\"password\" id=\"changeUsernamePassword\" placeholder=\"password\" required><br><input class=\"registerinput\" type=\"button\" id=\"changeUsernameButton\" value=\"Submit\" onclick=changeUsername()><br><br>',

	'changePasswordForm':'<p class=\"title1\">Change Password</p><br><p id=\"changePasswordFeedback\"></p><input class=\"registerinput\" type=\"password\" id=\"changePasswordPassword\" placeholder=\"Current password\" required><br><input class=\"registerinput\" type=\"password\" id=\"changePasswordNewPassword\" placeholder=\"New password\" required><br><input class=\"registerinput\" type=\"password\" id=\"changePasswordNewPassword2\" placeholder=\"Repeat new password\" required><br><input class=\"registerinput\" type=\"button\" id=\"changePasswordButton\" value=\"Submit\" onclick=changePassword()><br><br>',

	'changeEmailForm':'<p class=\"title1\">Change Email Address</p><br><p>To confirm your new email address you will get a confirmation email. You will have to click the link in the email to be able to log in again.</p><br><p id=\"changeEmailFeedback\"></p><input id=\"changeEmailEmail\" class=\"registerinput\" type=\"email\" placeholder=\"New email address\" required><br><input id=\"changeEmailPassword\" class=\"registerinput\" type=\"password\" placeholder=\"Password\" required><br><input class=\"registerinput\" type=\"button\" id=\"changeEmailButton\" value=\"Submit\" onclick=changeEmail()><br><br>',

	'deleteUserForm':'<p class=\"title1\">Delete Account</p><br><p id=\"deleteFeedback\"></p><input id=\"deletePassword\" class=\"registerinput\" type=\"password\" name=\"password\" placeholder=\"Password\" required><br><input class=\"registerinput\" type=\"button\" id=\"deleteButton\" value=\"Submit\" onclick=deleteUser()><br><br>'

} 