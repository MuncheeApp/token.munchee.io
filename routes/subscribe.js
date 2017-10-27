var mcapi = require('mailchimp-api/mailchimp');

var MAILCHIMP_KEY = process.env.MAILCHIMP_KEY || "None"  
mc = new mcapi.Mailchimp(MAILCHIMP_KEY);

exports.subscribe = function (req, res, next) {
	console.log("Submitting to rout subscribe")
	var listId = 'a757a78290';
	console.log(req.body.email)
	mc.lists.subscribe({id: listId, email: {email: req.body.email}}, function (data) {
		console.log(req.body.email + " subscribed");
		// req.session.success_flash = 'User subscribed successfully! Look for the confirmation email.';
		return res.json({ message: 'Thank you! You have successfully subscribed to receive latest updates about our launch.'});
	}, function (error) {
		if (error) {
			console.log(error)
			return res.status(400).json({ message: error.error});
		}
	});
};
