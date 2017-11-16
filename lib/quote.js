var quotes = [
	"Wherever you go becomes a part of you somehow",
	"Do not fear what you don't know",
	"Better to see something once than hear about it a thousand times",
	"Travelling - it leaves you speechless, then turns you into a storyteller",
	"Travel and change of place impart new vigor to the mind."
];

exports.getQuote = function() {
	var index = Math.floor(Math.random() * quotes.length;
	return quotes[index];
};