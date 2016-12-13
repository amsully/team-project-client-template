var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = "eastern_hawthorne";
// Put the initial mock objects here.
var initialData = {
  "users": {
      "1": {
        "_id": new ObjectID("000000000000000000000001"),
        "FirstName": "Tim",
        "LastName": "Richards",
        "Username": "TRichards",
        "Password": "*********",
        "Email": "TRichards@umass.edu",
        "PhoneNumber": "413-867-5309",
        "Address": "54 Madison Avenue",
        "feed": new ObjectID("000000000000000000000006")
      }
  },

  "feeds": {
    "rightSideBar": {
      "_id": new ObjectID("000000000000000000000001"),
      "contents":[]
    },
    "leftSideBar": {
      "_id": new ObjectID("000000000000000000000002"),
      "contents":[]
    },
    "customizationPage": {
      "_id": new ObjectID("000000000000000000000003"),
      "contents":[]
    },
    "profile": {
      "_id": new ObjectID("000000000000000000000004"),
      "contents":[]
    },
    "userGenerated": {
      "_id": new ObjectID("000000000000000000000005"),
      "contents":[]
    },
    "mainPage": {
      "_id": new ObjectID("000000000000000000000006"),
      "contents":[]
    },
    "fullTrip": {
      "_id": new ObjectID("000000000000000000000007"),
      "contents":[]
    }
  },

  "feedItem": {
    "1": {
      "_id": new ObjectID("000000000000000000000001"),
      "type": "ActivityItem",
      "contents": {
        "name":"New England Aquarium",
        "type":"Aquarium",
        "price":"$$$",
        "rating":3
      }
    },
    "2": {
      "_id": new ObjectID("000000000000000000000002"),
      "type": "AccommodationItem",
      "contents": {
        "type":"hotel",
        "name":"The Westin Copley Place",
        "price":"$299 per night",
        "people":2
      }
    },
    "3": {
      "_id": new ObjectID("000000000000000000000003"),
      "type": "RestaurantItem",
      "contents": {
        "type":"Seafood",
        "name":"Neptune Oyster",
        "price":"$$$",
        "rating":4
      }
    },
    "4": {
      "_id": new ObjectID("000000000000000000000004"),
      "type": "TripSummaryItem",
      "trip_id": new ObjectID("000000000000000000000001"),
      "contents": {
        "author":new ObjectID("000000000000000000000001"),
        "trip":new ObjectID("000000000000000000000001"),
        "start":"Amherst, MA",
        "destination":"Boston, MA",
        "dates":"6/24/2011 - 6/24/2011",
        "summary":"A day trip to Boston by car for under $300. Destinations include the Boston Aquarium and Franklin Park Zoo. Planned restaurants include Italian Express Pizzeria and The Capital Grille."
      }
    },
    "5": {
      "_id": new ObjectID("000000000000000000000005"),
      "type": "TripSummaryItem",
      "trip_id":new ObjectID("000000000000000000000002"),
      "contents": {
        "author": new ObjectID("000000000000000000000001"),
        "trip": new ObjectID("000000000000000000000002"),
        "start":"Boston, MA",
        "destination":"Washington DC",
        "dates":"2/4/2014 - 2/10/2014",
        "summary":"A 7 day trip to Washington DC by airplane for under $9000. Destinations include the Museum of Natural History and the National Air and Space Museum. Planned restaurants include We the Pizza and GrillFish."
      }
    },
    "6": {
      "_id": new ObjectID("000000000000000000000006"),
      "type": "TripSummaryItem",
      "trip_id": new ObjectID("000000000000000000000003"),
      "contents": {
        "author": new ObjectID("000000000000000000000001"),
        "trip": new ObjectID("000000000000000000000003"),
        "start":"Worcester, MA",
        "destination":"Chatham, MA",
        "dates":"3/29/2016 - 3/29/2016",
        "summary":"A day trip to Cape Cod by car for under $500. Destinations include Nauset Beach and Chatham Lighthouse. Planned restaurants include Arnold's Restaurant and Longshore Restaurant."
      }
    },
    "7": {
      "_id": new ObjectID("000000000000000000000007"),
      "type": "RestaurantItem",
      "contents": {
        "type":"American",
        "name":"McDonalds",
        "price":"$",
        "rating":1
      }
    },
    "8": {
      "_id": new ObjectID("000000000000000000000008"),
      "type": "RestaurantItem",
      "contents": {
        "type":"American",
        "name":"Burger King",
        "price":"$",
        "rating":1
      }
    },
    "9": {
      "_id": new ObjectID("000000000000000000000009"),
      "type": "ActivityItem",
      "contents": {
        "name":"Boston Common",
        "type":"Parks and Recreation",
        "price":"$",
        "rating":4
      }
    },
    "10": {
      "_id": new ObjectID("000000000000000000000010"),
      "type": "ActivityItem",
      "contents": {
        "name":"Fanuil Hall",
        "type":"Historic Site",
        "price":"$",
        "rating":5
      }
    }
  },

  "trip":{
    "1":{
      "_id": new ObjectID("000000000000000000000001"),
      "author": new ObjectID("000000000000000000000001"),
      "accommodations":[new ObjectID("000000000000000000000002")],
      "restaurants":[
        new ObjectID("000000000000000000000003"),
        new ObjectID("000000000000000000000007"),
        new ObjectID("000000000000000000000008")],
      "activities":[
        new ObjectID("000000000000000000000001"),
        new ObjectID("000000000000000000000009"),
        new ObjectID("000000000000000000000010")]
    },
    "2":{
      "_id": new ObjectID("000000000000000000000002"),
      "author": new ObjectID("000000000000000000000001"),
      "accommodations":[],
      "restaurants":[],
      "activities":[]
    },
    "3":{
      "_id": new ObjectID("000000000000000000000003"),
      "author": new ObjectID("000000000000000000000001"),
      "accommodations":[],
      "restaurants":[],
      "activities":[]
      }
    }
};

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
