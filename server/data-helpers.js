
"use strict";

// Defines helper functions for saving and getting favourites, using the database `db`
module.exports = function makeDataHelpers() {
  return {

    // Get all waste in `db`
    findDocuments: function(waste, callback) {
      data.find({"keywords": waste}).toArray(function(err) {
        callback(null);
      });

    }

    }
  }
