// Your startup's initial mock objects go here
var initialData = {
  "users": {
      "1": {
        "_id": 1,
        "FirstName": "Tim",
        "LastName": "Richards",
        "Username": "TRichards",
        "Password": "*********",
        "Email": "TRichards@umass.edu",
        "PhoneNumber": "413-867-5309",
        "Address": "54 Madison Avenue",
        "feed": 6
      }
  },

  "feeds": {
    "rightSideBar": {
      "_id": 1,
      "contents":[]
    },
    "leftSideBar": {
      "_id": 2,
      "contents":[]
    },
    "customizationPage": {
      "_id": 3,
      "contents":[]
    },
    "profile": {
      "_id": 4,
      "contents":[]
    },
    "userGenerated": {
      "_id": 5,
      "contents":[]
    },
    "mainPage": {
      "_id": 6,
      "contents":[]
    },
    "fullTrip": {
      "_id": 7,
      "contents":[]
    }
  },

  "feedItem": {
    "1": {
      "_id": 1,
      "type": "ActivityItem",
      "contents": {
        "name":"New England Aquarium",
        "type":"Aquarium",
        "price":"$$$",
        "rating":3
      }
    },
    "2": {
      "_id": 2,
      "type": "AccommodationItem",
      "contents": {
        "type":"hotel",
        "name":"The Westin Copley Place",
        "price":"$299 per night",
        "people":2
      }
    },
    "3": {
      "_id": 3,
      "type": "RestaurantItem",
      "contents": {
        "type":"Seafood",
        "name":"Neptune Oyster",
        "price":"$$$",
        "rating":4
      }
    },
    "4": {
      "_id": 4,
      "type": "TripSummaryItem",
      "trip_id":1,
      "contents": {
        "author":1,
        "trip":1,
        "start":"Amherst, MA",
        "destination":"Boston, MA",
        "dates":"6/24/2011 - 6/24/2011",
        "summary":"A day trip to Boston by car for under $300. Destinations include the Boston Aquarium and Franklin Park Zoo. Planned restaurants include Italian Express Pizzeria and The Capital Grille."
      }
    },
    "5": {
      "_id": 5,
      "type": "TripSummaryItem",
      "trip_id":2,
      "contents": {
        "author":1,
        "trip":2,
        "start":"Boston, MA",
        "destination":"Washington DC",
        "dates":"2/4/2014 - 2/10/2014",
        "summary":"A 7 day trip to Washington DC by airplane for under $9000. Destinations include the Museum of Natural History and the National Air and Space Museum. Planned restaurants include We the Pizza and GrillFish."
      }
    },
    "6": {
      "_id": 6,
      "type": "TripSummaryItem",
      "trip_id":3,
      "contents": {
        "author":1,
        "trip":3,
        "start":"Worcester, MA",
        "destination":"Chatham, MA",
        "dates":"3/29/2016 - 3/29/2016",
        "summary":"A day trip to Cape Cod by car for under $500. Destinations include Nauset Beach and Chatham Lighthouse. Planned restaurants include Arnold's Restaurant and Longshore Restaurant."
      }
    },
    "7": {
      "_id": 7,
      "type": "RestaurantItem",
      "contents": {
        "type":"American",
        "name":"McDonalds",
        "price":"$",
        "rating":1
      }
    },
    "8": {
      "_id": 8,
      "type": "RestaurantItem",
      "contents": {
        "type":"American",
        "name":"Burger King",
        "price":"$",
        "rating":1
      }
    },
    "9": {
      "_id": 9,
      "type": "ActivityItem",
      "contents": {
        "name":"Boston Common",
        "type":"Parks and Recreation",
        "price":"$",
        "rating":4
      }
    },
    "10": {
      "_id": 10,
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
      "_id":1,
      "author":1,
      "accommodations":[2],
      "restaurants":[3,7,8],
      "activities":[1,9,10]
    },
    "2":{
      "_id":2,
      "author":1,
      "accommodations":[],
      "restaurants":[],
      "activities":[]
    },
    "3":{
      "_id":3,
      "author":1,
      "accommodations":[],
      "restaurants":[],
      "activities":[]
      }
    }
};


var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
