// Project's entry point 

var express = require('express');

var app = express();

var quote = require('./lib/quote.js');

// Set up handlebars view engine
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	res.render('about', 
		{ 
			quote: quote.getQuote(),
			pageTestScript: '/qa/tests-about.js'
		});
});


// Custom 404 page
app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

// Custom 500 page
app.use(function(err, req, res, next) {
	console.error(err.stack); // Outputs error message to the console
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port'));
});
