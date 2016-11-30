// Implement your server in this file.
// We should be able to run your server with node src/server.js

// Imports the express Node module.
var express = require('express');

var database = require('./database');
var bodyParser = require('body-parser');

// Creates an Express server.
var app = express();
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;

// You run the server from `server`, so `../client/build` is `server/../client/build`.
// '..' means "go up one directory", so this translates into `client/build`!
app.use(express.static('../client/build'));

// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());

// Starts the server on port 3000!
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
