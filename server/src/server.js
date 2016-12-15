// Implement your server in this file.
// We should be able to run your server with node src/server.js

// Imports the express Node module.
var express = require('express');

var database = require('./database');
var bodyParser = require('body-parser');

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('mongo-express/config.default.js');


// Creates an Express server.
var app = express();
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var readDocument = database.readDocument;
var getCollection = database.getCollection;

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/eastern_hawthorne';

MongoClient.connect(url, function(err, db) {
  app.use('/mongo_express', mongo_express(mongo_express_config));

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
  app.delete('/full-trip/:tripid/feeditem/:feeditemid', function(req, res) {
      // TODO: Add Authorization
      var fromUser = 1; // getUserIdFromToken(req.get('Authorization'));
      // Convert from a string into a number.
      var tripId = req.params.tripid;
      var authorId = 1; // TODO: GET AUTHOR ID FROM tripID

      var feedItemId = parseInt(req.params.feeditemid, 10);
      // var feedItem = database.readDocument('feedItem', feedItemId);

      // Check that the author of the post is requesting the delete.
      if (authorId === fromUser) {
          // We don't want to delete our restaurant data!
          // database.deleteDocument('feedItem', feedItemId);

          var trips = database.getCollection('trip');
          // var tripIds = Object.keys(trips);
          var trip = trips[tripId];

          // PARSE INT IS IMPORTANT.
          var itemIdx = trip.activities.indexOf(parseInt(feedItemId));
          if (itemIdx !== -1) {
              // Splice out of array.
              trip.activities.splice(itemIdx, 1);
              // Update feed.
              database.writeDocument('trip', trip);
          }
          itemIdx = trip.accommodations.indexOf(parseInt(feedItemId));
          if (itemIdx !== -1) {
              // Splice out of array.
              trip.accommodations.splice(itemIdx, 1);
              // Update feed.
              database.writeDocument('trip', trip);
          }
          itemIdx = trip.restaurants.indexOf(parseInt(feedItemId));
          if (itemIdx !== -1) {
              // Splice out of array.
              trip.restaurants.splice(itemIdx, 1);
              // Update feed.
              database.writeDocument('trip', trip);
          }

          // Send a blank response to indicate success.
          res.send();
      } else {
          // 401: Unauthorized.
          res.status(401).end();
      }
  });

  function getFeedItem(feedItemId, callback) {
    // Get the feed item with the given ID.
    db.collection('feedItem').findOne({
      _id: feedItemId
    }, function(err, feedItem) {
      if (err) {
        // An error occurred.
        return callback(err);
      } else if (feedItem === null) {
        // Feed item not found!
        return callback(null, null);
      }
      else {
        return callback(null,feedItem);
      }
    });
  }
  function getUser(userId, callback) {
    // Get the feed item with the given ID.
    db.collection('users').findOne({
      _id: userId
    }, function(err, user) {
      if (err) {
        // An error occurred.
        return callback(err);
      } else if (user === null) {
        // Feed item not found!
        return callback(null, null);
      }
      else {
        return callback(null,user);
      }
    });
  }

  function getModalTrips(callback){
    var trips = {
      trip1: {},
      trip2: {},
      trip3: {}
    };
    var author = "";
    getFeedItem(new ObjectID("000000000000000000000004"),function(err, feedItem) {
      if (err) {
        // Pass an error to the callback.
        callback(err);
      } else {
        trips.trip1 = feedItem;
        getFeedItem(new ObjectID("000000000000000000000005"),function(err, feedItem2) {
          if (err) {
            // Pass an error to the callback.
            callback(err);
          } else {
            trips.trip2 = feedItem2;
            getFeedItem(new ObjectID("000000000000000000000006"),function(err, feedItem3) {
              if (err) {
                // Pass an error to the callback.
                callback(err);
              } else {
                trips.trip3 = feedItem3;
                getUser(feedItem3.contents.author,function(err, user) {
                  if (err) {
                    // Pass an error to the callback.
                    callback(err);
                  } else {
                    author = user.FirstName + " " + user.LastName;
                    trips.trip1.contents.author = author;
                    trips.trip2.contents.author = author;
                    trips.trip3.contents.author = author;
                    return callback(null,trips);
                  }
                });
              }
            });
          }
        });
      }
    });
  }
  app.get('/test',function(req,res){
    getFeedItem(new ObjectID("000000000000000000000006"),function(err, modalData) {
      if (err) {
        // A database error happened.
        // Internal Error: 500.
        res.status(500).send("Database error: " + err);
      } else if (modalData === null) {
        // Couldn't find the feed in the database.
        res.status(400).send("Could not read modal data ");
      } else {
        // Send data.
        res.send(modalData);
      }
    });
  });

  app.get('/modal/trip-sums',function(req,res){
    getModalTrips(function(err, modalData) {
      if (err) {
        // A database error happened.
        // Internal Error: 500.
        res.status(500).send("Database error: " + err);
      } else if (modalData === null) {
        // Couldn't find the feed in the database.
        res.status(400).send("Could not read modal data ");
      } else {
        // Send data.
        res.send(modalData);
      }
    });
  });


  function getRecentTrips() {

      return db.collection('trips');
      //var tripsData = getCollection('trip');
      //return tripsData
  }

  app.get('/trips/', function(req, res) {
    res.send(getRecentTrips())
  })

  function getUserTrips() {
    var you = 1;
    var trips = {trip1: {},trip2: {},trip3: {}};
    trips.trip1 = null;trips.trip2 = null;trips.trip3 = null;//defaults
    for(var i=1; i<11; i++){
      var trip = getFeedItemSync(i);
      if(trip.type == "TripSummaryItem"){//is tripsummary
        if(trip.contents.author == you){//these are supposed to be your trips
          var user = readDocument('users',trip.contents.author);
          trip.contents.author = user.FirstName + " " + user.LastName;//define author bit from modal code
          if(trips.trip1 == null){trips.trip1 = trip;}//because i couldn't figure it out in a more standard arrayish way
          else if(trips.trip2 == null){trips.trip2 = trip;}
          else if(trips.trip3 == null){trips.trip3 = trip;}
        }
      }
    }
    return trips;
  }
  app.get('/trips/:userid', function(req, res) {
    //var user=1;
    res.send(getUserTrips());
  })

  app.get('/users/:userid', function(req, res) {
      var userid = req.params.userid;
      res.send(getUser(userid));
  });

  function updateUser(userid){
      var userData = database.readDocument('users', userid);

      // Map the Feed's FeedItem references to actual FeedItem objects.
      // Note: While map takes a callback function as an argument, it is
      // synchronous, not asynchronous. It calls the callback immediately.
      userData.FirstName      = userData.FirstName.map(getFeedItemSync);
      userData.LastName       = userData.LastName.map(getFeedItemSync);
      userData.Username       = userData.Username.map(getFeedItemSync);
      userData.Password       = userData.Password.map(getFeedItemSync);
      userData.Email          = userData.Email.map(getFeedItemSync);
      userData.PhoneNumber    = userData.PhoneNumber.map(getFeedItemSync);
      userData.Address        = userData.Address.map(getFeedItemSync);
      userData.feed           = userData.feed.map(getFeedItemSync);
      // Return FeedData with resolved references.
      // emulateServerReturn will emulate an asynchronous server operation, which
      // invokes (calls) the "cb" function some time in the future.
      return userData;
  }

  app.put('/users/:userid', function(req,res) {
      var fromUser = 1; // getUserIdFromToken(req.get('Authorization'));
      var userid = req.params.userid;
      var authorId = 1;
      var feedItemId = parseInt(req.params.feeditemid, 10);
      // var feedItem = database.readDocument('feedItem', feedItemId);

      // Check that the author of the post is requesting the delete.
      if (authorId === fromUser) {

          var users = database.getCollection('users');
          var user = users[userid];

          // PARSE INT IS IMPORTANT.
          var index = user.FirstName.indexOf(parseInt(feedItemId));
          if (index !== -1) {
              database.writeDocument('users', users);
          }
          index = user.LastName.indexOf(parseInt(feedItemId));
          if (index !== -1) {
              database.writeDocument('users', users);
          }
          index = user.Username.indexOf(parseInt(feedItemId));
          if (index !== -1) {
              database.writeDocument('users', users);
          }
          index = user.Password.indexOf(parseInt(feedItemId));
          if (index !== -1) {
              database.writeDocument('users', users);
          }
          index = user.Email.indexOf(parseInt(feedItemId));
          if (index !== -1) {
              database.writeDocument('users', users);
          }
          index = user.PhoneNumber.indexOf(parseInt(feedItemId));
          if (index !== -1) {
              database.writeDocument('users', users);
          }
          index = user.Address.indexOf(parseInt(feedItemId));
          if (index !== -1) {
              database.writeDocument('users', users);
          }index = user.feed.indexOf(parseInt(feedItemId));
          if (index !== -1) {
              database.writeDocument('users', users);
          }

          // Send a blank response to indicate success.
          res.send();
      } else {
          // 401: Unauthorized.
          res.status(401).end();
      }
  });


  // Starts the server on port 3000!
  app.listen(3000, function() {
      console.log('Example app listening on port 3000!');
  });
});
