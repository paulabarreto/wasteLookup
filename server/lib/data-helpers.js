
"use strict";
const ObjectId = require('mongodb').ObjectID;

// Defines helper functions for saving and getting favourites, using the database `db`
module.exports = function makeDataHelpers(db) {

  const data = db.collection("wastedata");

  return {

    getData: function(callback) {
      data.find({}).toArray(function (err, docs) {
        if(err) throw err;
        console.log(docs);
        callback(null, docs);
      });

    },

    findData: function(waste, cb) {
      data.find({"keywords": {"$regex": waste}} ).toArray(cb);
    },

    postFave: function(fave, cb) {
      data.update(
            {"_id": ObjectId(fave._id) },
            { $set: { "favourite": true } },
            function (err, result) {
              if(err) throw err;
              console.log("added fave");
            })
    },

    removeFave: function(fave, cb) {
      data.update(
            {"_id": ObjectId(fave._id) },
            { $set: { "favourite": false } },
            function (err, result) {
              if(err) throw err;
              console.log("removed fave");
            })
    }
  }
}
