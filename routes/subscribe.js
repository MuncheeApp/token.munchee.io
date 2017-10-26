var mcapi = require('mailchimp-api/mailchimp');

mc = new mcapi.Mailchimp('72a5325971a1bf787451b935f0e588af-us14');

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
