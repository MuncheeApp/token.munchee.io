var mcapi = require('mailchimp-api/mailchimp');

var MAILCHIMP_KEY = process.env.MAILCHIMP_KEY || "None"  
var LIST_ID = process.env.LIST_ID || "b55cb6b73d"

var fs = require('fs');


mc = new mcapi.Mailchimp(MAILCHIMP_KEY);


exports.subscribe = function (req, res, next) {
	console.log("Submitting to rout subscribe")
	var listId = LIST_ID;
	console.log(req.body.email)

	

	mc.lists.subscribe({id: listId, email: {email: req.body.email}}, function (data) {
		fs.appendFile('./email.txt', req.body.email + "\n", function (err) {
			console.log('Saved!');
		});
		console.log(req.body.email + " subscribed");
		// req.session.success_flash = 'User subscribed successfully! Look for the confirmation email.';
		return res.json({ message: 'Thank you! You have successfully subscribed to receive latest updates about our launch.'});
	}, function (error) {
		if (error) {
			console.log(error.error)
			fs.appendFile('./log_error.txt', error.error + "\n", function (err) {
				console.log('Saved Error!');
			});
			
			return res.status(400).json({ message: error.error});
		}
	});
};
