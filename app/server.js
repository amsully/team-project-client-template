import {readDocument, writeDocument, addDocument,feedItemsLength} from './database.js';

/**
 * Given a feed item ID, returns a FeedItem object with references resolved.
 * Internal to the server, since it's synchronous.
 */
function getFeedItemSync(feedItemId) {
    var feedItem = readDocument('feedItem', feedItemId);

    return feedItem;
}

function getUser(usersId, cb) {
    var users = readDocument('users', usersId);
    var feedData = readDocument('feeds', users.feed);
    feedData.contents.unshift(newStatusUpdate._id);
// Update the feed object.
    writeDocument('feeds', feedData);
// Return the newly-posted object.
    emulateServerReturn(users, cb);
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

export function getMOdalTripSums(userID, cb) {
    var tripSums = [];
    var i = feedItemsLength();
    for(var j=0;j<=3;i--){
      var item = readDocument('feedItem',4);
      if(item.type == "TripSummaryItem"){
        if(item.contents.author == userID){
          item.contents.author = readDocument('users',item.contents.author);
          item.contents.trip = getFullTripData(item.trip_id);
          tripSums[0] = item;
          j++;
        }
      }
    }
    emulateServerReturn(tripSums, cb);
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
