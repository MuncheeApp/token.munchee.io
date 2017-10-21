var mcapi = require('mailchimp-api/mailchimp');

mc = new mcapi.Mailchimp('86c4a117e44b0240db67a85ba04256a1-us14');

exports.subscribe = function (req, res, next) {
	var listId = 'dddbef3e8e';
	mc.lists.subscribe({id: listId, email: {email: req.body.email}}, function (data) {
		console.log(req.body.email + " subscribed");
		// req.session.success_flash = 'User subscribed successfully! Look for the confirmation email.';
		return res.json({ message: 'Thank you! You have successfully subscribed to receive latest updates about our launch.'});
	}, function (error) {
		if (error) {
			retumuncheestatus(400).json({ message: error.error});
		}
	});
};
