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

function getFeedItemSync(feedItemId) {
    var feedItem = database.readDocument('feedItem', feedItemId);

    return feedItem;
}

function getFullTripData(trip) {
    // Get the User object with the id "user".
    var tripData = database.readDocument('trip', trip);

    // Map the Feed's FeedItem references to actual FeedItem objects.
    // Note: While map takes a callback function as an argument, it is
    // synchronous, not asynchronous. It calls the callback immediately.
    tripData.accommodations = tripData.accommodations.map(getFeedItemSync);
    tripData.restaurants    = tripData.restaurants.map(getFeedItemSync);
    tripData.activities     = tripData.activities.map(getFeedItemSync);
    // Return FeedData with resolved references.
    // emulateServerReturn will emulate an asynchronous server operation, which
    // invokes (calls) the "cb" function some time in the future.
    return tripData;
}

// Using '/full-trip' temporarily. Should switch to '/full-trip/:trip-id'
app.get('/full-trip/:tripid', function(req, res) {
  // URL parameters are stored in req.params
  var tripid = req.params.tripid;
  // Send response.
  res.send(getFullTripData(tripid));
});

function getModalTrips(){

}
app.get('modal/trip-sums',function(req,res){
  res.send(getModalTrips());
});
// Starts the server on port 3000!
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
