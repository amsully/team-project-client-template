import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var initialData = {
  "users": {
         "1": {
            "_id": 1,
            "fullName": "Someone"
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
    "profile": {"_id": 4,
"contents":[]},
    "userGenerated": {
"_id": 5,
"contents":[]
},
    "mainPage": {
"_id": 6,
"contents":[]
},
    "fullTrip": {"_id": 7}
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

      }
    }
  },
  "trip":{
    "1":{
        "_id":1,
        "author":2,
    "accommodations":[],
    "restaurants":[],
    "activities":[]
    }
  }
};




var data = JSON.parse(localStorage.getItem("shed_data"));
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
  localStorage.setItem("shed_data", JSON.stringify(data));
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
  localStorage.setItem("shed_data", JSON.stringify(initialData));
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
