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
var readDocument = database.readDocument;
var getCollection = database.getCollection;

// You run the server from `server`, so `../client/build` is `server/../client/build`.
// '..' means "go up one directory", so this translates into `client/build`!
app.use(express.static('../client/build'));

// Support receiving text in HTTP request bodies
app.use(bodyParser.text());
// Support receiving JSON in HTTP request bodies
app.use(bodyParser.json());

function getFeedItemSync(feedItemId) {
    console.log("feedItemId:");
    console.log(feedItemId);
    var feedItem = database.readDocument('feedItem', feedItemId);

    return feedItem;
}

function getFullTripData(trip) {
    // Get the User object with the id "user".
    console.log(trip);
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

// Reset database.
app.post('/resetdb', function(req, res) {
    console.log("Resetting database...");
    // This is a debug route, so don't do any validation.
    database.resetDatabase();
    // res.send() sends an empty response with status code 200
    res.send();
});

/**
 * Delete a feed item.
 */
// app.delete('/feeditem/:feeditemid', function(req, res) {
//     // TODO: Add Authorization
//     var fromUser = 0; // getUserIdFromToken(req.get('Authorization'));
//     // Convert from a string into a number.
//     var feedItemId = parseInt(req.params.feeditemid, 10);
//     var feedItem = database.readDocument('feedItem', feedItemId);
//
//     // Check that the author of the post is requesting the delete.
//
//     if (feedItem.author === fromUser) {
//         database.deleteDocument('feedItem', feedItemId);
//         // Remove references to this feed item from all other feeds.
//         var trips = database.getCollection('trip');
//         var tripIds = Object.keys(trips);
//         tripIds.forEach((tripId) => {
//             var trip = trips[tripId];
//             var itemIdx = trip.activities.indexOf(feedItemId);
//             if (itemIdx !== -1) {
//                 // Splice out of array.
//                 trip.contents.splice(itemIdx, 1);
//                 // Update feed.
//                 database.writeDocument('trip', trip);
//             }
//         });
//
//         // TODO: Add checks for all accommodations and restaurants.
//
//         // Send a blank response to indicate success.
//         res.send();
//     } else {
//         // 401: Unauthorized.
//         res.status(401).end();
//     }
// });

function getModalTrips(){
  var trips = [];
  var trip1 = getFeedItemSync(4);
  var user = readDocument('users',trip1.contents.author);
  trip1.contents.author = user.FirstName + " " + user.LastName;
  trips.push(trip1);
  var trip2 = getFeedItemSync(5);
  user = readDocument('users',trip2.contents.author);
  trip2.contents.author = user.FirstName + " " + user.LastName;
  trips.push(trip2);
  var trip3 = getFeedItemSync(6);
  user = readDocument('users',trip3.contents.author);
  trip3.contents.author = user.FirstName + " " + user.LastName;
  trips.push(trip3);
  return trips;
}
app.get('/modal/trip-sums',function(req,res){
  res.send(getModalTrips());
});


function getRecentTrips(cb) {
    var tripsData = getCollection('trip');
    return cb(tripsData)
}

app.get('/trips/', function(req, res) {
  res.send(getRecentTrips)
})

// Starts the server on port 3000!
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
