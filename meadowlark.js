// Project's entry point 

var express = require('express');

var app = express();

var quotes = [
	"Wherever you go becomes a part of you somehow",
	"Do not fear what you don't know",
	"Better to see something once than hear about it a thousand times",
	"Travelling - it leaves you speechless, then turns you into a storyteller",
	"Travel and change of place impart new vigor to the mind."
];


// Set up handlebars view engine
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/about', function(req, res) {
	var randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
	res.render('about', { quote: randomQuote });
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
