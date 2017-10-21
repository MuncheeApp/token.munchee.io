var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var MessageController = require('./routes/message');
var SubscribeController = require('./routes/subscribe');
var compression = require('compression');
/**
 * Routing & middlewares
 */
app.use(express.static(__dirname + '/static'));

// parse application/json
app.use(bodyParser.json());

app.use(compression());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// display favicon
// app.use(favicon(__dirname + '/static/img/favicon.ico'));

app.use(router);

router.post('/sendmessage', MessageController.post);
router.post('/subscribe', SubscribeController.subscribe);

app.use(function (request, response) {
	response.status(404).json({
		message: 'Oops! You may get lost!',
		code: 'E_NOTFOUND'
	});
});

app.use(function (error, request, response, next) {
	response.status(500).json({
		message: error.message,
		code: error.code
	});
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
	console.log('Foodee service runs on port: ' + app.get('port'));
});

module.exports = app;
