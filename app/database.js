import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "Shed+";

// Put your mock objects here, as in Workshop 4
var initialData = {
  "users": {
      "1": {
        "_id": 1,
        "fullName": "User",
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
      "contents":[4,5,6]
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
      "type": "activityItem",
      "contents": {}
    },
    "2": {
      "_id": 2,
      "type": "AccommodationItem",
      "contents": {
      }
    },
    "3": {
      "_id": 3,
      "type": "RestaurantItem",
      "contents": {
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
    }
  },

  "trip":{
    "1":{
      "_id":1,
      "author":1,
      "accommodations":[],
      "restaurants":[],
      "activities":[]
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

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
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
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
