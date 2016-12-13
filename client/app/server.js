import {
    readDocument,
    writeDocument,
    addDocument,
    getCollection
} from './database.js';

var token = ''; // <-- Put your base64'd JSON token here
/**
 * Properly configure+send an XMLHttpRequest with error handling,
 * authorization token, and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(verb, resource);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    // The below comment tells ESLint that FacebookError is a global.
    // Otherwise, ESLint would complain about it! (See what happens in Atom if
    // you remove the comment...)
    /* global SHEDError */
    // Response received from server. It could be a failure, though!
    xhr.addEventListener('load', function() {
        var statusCode = xhr.status;
        var statusText = xhr.statusText;
        if (statusCode >= 200 && statusCode < 300) {
            // Success: Status code is in the [200, 300) range.
            // Call the callback with the final XHR object.
            cb(xhr);
        } else {
            // Client or server error.
            // The server may have included some response text with details concerning
            // the error.
            var responseText = xhr.responseText;
            SHEDError('Could not ' + verb + " " + resource + ": Received " +
                statusCode + " " + statusText + ": " + responseText);
        }
    });
    // Time out the request if it takes longer than 10,000
    // milliseconds (10 seconds)
    xhr.timeout = 10000;
    // Network failure: Could not connect to server.
    xhr.addEventListener('error', function() {
        SHEDError('Could not ' + verb + " " + resource +
            ": Could not connect to the server.");
    });
    // Network failure: request took too long to complete.
    xhr.addEventListener('timeout', function() {
        SHEDError('Could not ' + verb + " " + resource +
            ": Request timed out.");
    });
    switch (typeof(body)) {
        case 'undefined':
            // No body to send.
            xhr.send();
            break;
        case 'string':
            // Tell the server we are sending text.
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            xhr.send(body);
            break;
        case 'object':
            // Tell the server we are sending JSON.
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            // Convert body into a JSON string.
            xhr.send(JSON.stringify(body));
            break;
        default:
            throw new Error('Unknown body type: ' + typeof(body));
    }
}

/**
 * Given a feed item ID, returns a FeedItem object with references resolved.
 * Internal to the server, since it's synchronous.
 */
function getFeedItemSync(feedItemId) {
    var feedItem = readDocument('feedItem', feedItemId);

    return feedItem;
}

export function getUser(userid, cb) {
    /**var users = readDocument('users', usersId);
    var feedData = readDocument('feeds', users.feed);
    feedData.contents.unshift(users._id);
    // Update the feed object.
    writeDocument('feeds', feedData);
    // Return the newly-posted object.
    emulateServerReturn(users, cb);**/
    sendXHR('GET', '/users/' + userid, undefined, (xhr) => {
      // double check this
      cb(JSON.parse(xhr.responseText));
    });
}
export function updateUser(userid, cb){
    sendXHR('PUT', '/users/' + userid, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
});
}

export function getModalTrips(cb){
  sendXHR('GET', '/modal/trip-sums', undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

/**
 * Emulates a REST call to get the feed data for a particular user.
 * @param user The ID of the user whose feed we are requesting.
 * @param cb A Function object, which we will invoke when the Feed's data is available.
 */
export function getFullTripData(trip, cb) {
    // We don't need to send a body, so pass in 'undefined' for the body.
    sendXHR('GET', '/full-trip/1', undefined, (xhr) => {
      // Call the callback with the data.
      cb(JSON.parse(xhr.responseText));
    });

    // // Get the User object with the id "user".
    // var tripData = readDocument('trip', trip);
    //
    // // Map the Feed's FeedItem references to actual FeedItem objects.
    // // Note: While map takes a callback function as an argument, it is
    // // synchronous, not asynchronous. It calls the callback immediately.
    // tripData.accommodations = tripData.accommodations.map(getFeedItemSync);
    // tripData.restaurants = tripData.restaurants.map(getFeedItemSync);
    // tripData.activities = tripData.activities.map(getFeedItemSync);
    // // Return FeedData with resolved references.
    // // emulateServerReturn will emulate an asynchronous server operation, which
    // // invokes (calls) the "cb" function some time in the future.
    // emulateServerReturn(tripData, cb);
}

/**
 * Deletes a activity item.
 */
export function deleteFeedItem(feedItemId, tripId, cb) {
    sendXHR('DELETE', 'full-trip/' + tripId + '/feeditem/' + feedItemId, {
        tripId: tripId
    }, () => {
        cb();
    });
}

export function getRecentTrips(cb) {
    /**var tripsData = getCollection('trip');
    emulateServerReturn(tripsData, cb)**/
    sendXHR('GET', '/trips/', undefined, (xhr)=> {
      // Double check this
      cb(JSON.parse(xhr.responseText));
    });
}

export function getUserTrips(cb) {
    sendXHR('GET', '/trips/:userid', undefined, (xhr)=> {
      cb(JSON.parse(xhr.responseText));
    });
}

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
    setTimeout(() => {
        cb(data);
    }, 4);
}
