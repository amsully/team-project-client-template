import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var initialData = {
  "users": {
      "1": {
        "_id": 1,
        "FirstName": "Tim",
        "LastName": "Richards",
        "Username": "TRichards",
        "Password": "*********",
        "Email": "TRichards@umass.edu",
        "Phone Number": "413-867-5309",
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
 * Emulates reading multiple "documents" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function getCollection(collection) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection]);
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
export function feedItemsLength() {
  var nextId = Object.keys('feedItem').length;
  while ("feedItem"[nextId]) {
    nextId++;
  }
  return nextId - 1;
}

/**
 * Reset database button.
 */
class ResetDatabase extends React.Component {
  render() {
    return (
        <button className="btn btn-default" type="button" onClick={() => {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/resetdb');
            xhr.addEventListener('load', function() {
                window.alert("Database reset! Refreshing the page now...");
                document.location.reload(false);
            });
            xhr.send();
        }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
