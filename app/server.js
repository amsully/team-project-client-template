import {readDocument, writeDocument, addDocument, readDocuments} from './database.js';

/**
 * Given a feed item ID, returns a FeedItem object with references resolved.
 * Internal to the server, since it's synchronous.
 */
function getFeedItemSync(feedItemId) {
    var feedItem = readDocument('feedItem', feedItemId);

    return feedItem;
}

/**
 * Emulates a REST call to get the feed data for a particular user.
 * @param user The ID of the user whose feed we are requesting.
 * @param cb A Function object, which we will invoke when the Feed's data is available.
 */
export function getFullTripData(trip, cb) {
    // Get the User object with the id "user".
    var tripData = readDocument('trip', trip);

    // Map the Feed's FeedItem references to actual FeedItem objects.
    // Note: While map takes a callback function as an argument, it is
    // synchronous, not asynchronous. It calls the callback immediately.
    tripData.accommodations = tripData.accommodations.map(getFeedItemSync);
    tripData.restaurants    = tripData.restaurants.map(getFeedItemSync);
    tripData.activities     = tripData.activities.map(getFeedItemSync);
    // Return FeedData with resolved references.
    // emulateServerReturn will emulate an asynchronous server operation, which
    // invokes (calls) the "cb" function some time in the future.
    emulateServerReturn(tripData, cb);
}

export function getRecentTrips(cb) {
    var tripsData = readDocuments('trip');

    emulateServerReturn(tripsData, cb)
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
