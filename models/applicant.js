// Define a model for our applicants...

// Includes Mongoose
var mongoose = require('mongoose');

// Declare a schema for our data
var hireSchema = mongoose.Schema({
    name: String,
    bio: String,
    skills: String,
    years: Number,
    why: String
});

// Use the schema to define a model
var Applicant = mongoose.model('Applicant', hireSchema);

// export our model
module.exports = Applicant;
