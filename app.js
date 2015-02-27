var express = require('express');
var bodyParser = require('body-parser');

// Includes Mongoose
var mongoose = require('mongoose');

// Connects to monogod - database name: node8_2
mongoose.connect('mongodb://localhost/node8_2');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});


// Includes Applicant Model
var Applicant = require('./models/applicant.js');

// displays a list of applicants
app.get('/applicants', function(req, res){
	Applicant.find({}, function(err, results){
		console.log('err:', err);
		console.log('results:', results);

		// Pass the results to our jade template
		// as the variable "applicants"
		res.render('applicants', {
			applicants: results
		});
	});
});

// creates an applicant
app.post('/applicant', function(req, res){
	// Retreives data from post body and stores it in the database
	var submittedData = req.body;

	var newApplicant = new Applicant({
		name: submittedData.name,
		bio: submittedData.bio,
		skills: submittedData.skills,
		years: submittedData.years,
		why: submittedData.why
	});

	newApplicant.save();
	res.redirect('/applicants');

});

var server = app.listen(8080, function() {
	console.log('Express server listening on port ' + server.address().port);
});
