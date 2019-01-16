
"use strict";

// Defines helper functions for saving and getting favourites, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a waste to fave
   saveTweet: function(fave, callback) {
       db.tweets.push(fave);
       callback(null, true);
   },

    // Get all waste in `db`
    getWaste: function(callback) {
      const wasteId = db.waste.map((e, i) => {
        return {
          ...e,
          id: i
        }
      });
      callback(null, wasteId);
    }
  };
}
