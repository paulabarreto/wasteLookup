"use strict";

require('dotenv').config();


const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
var methodOverride = require("method-override");
const app           = express();

const mongodb = require('mongodb');
const ObjectId = require('mongodb').ObjectID;

const dataHelpers = require('./data-helpers.js');

const MONGODB_URI = process.env.MONGODB_URI;

mongodb.MongoClient.connect(MONGODB_URI, function(err, client) {

  if(err) throw err;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));

  const db = client.db('wastewizard');
  const data = db.collection("wastedata");

  const findData = function(waste, cb) {
    data.find({"keywords": {"$regex": waste}} ).toArray(cb);
  }

  const postFave = function(fave, cb) {
    data.update(
          {"_id": ObjectId(fave._id) },
          { $set: { "favourite": true } },
          function (err, result) {
            if(err) throw err;
            console.log("added fave");
          })
  }

  const removeFave = function(fave, cb) {
    data.update(
          {"_id": ObjectId(fave._id) },
          { $set: { "favourite": false } },
          function (err, result) {
            if(err) throw err;
            console.log("removed fave");
          })
  }


  app.get("/", (req, res) => {
    data.find({}).toArray(function (err, docs) {

      if(err) throw err;

      console.log(docs);

      // Only close the connection when your app is terminating.
      client.close(function (err) {
        if(err) throw err;
      });
      res.send(docs);
    });
  });

  app.post("/waste", function(req, res) {
        const search = req.body.search;
        findData(search, function(err, docs){
            if (err) {
                console.log(err);
                return res(err);
            } else {
                return res.json(docs);

            }
        });
    });

    app.put("/favourites", function(req, res) {
          const fave = req.body;
          postFave(fave, function(err, docs){
              if (err) {
                  console.log(err);
                  return res(err);
              } else {
                  return res.json(docs);
              }
          });
      });

      app.put("/unfavourites", function(req, res) {
            const fave = req.body;
            removeFave(fave, function(err, docs){
                if (err) {
                    console.log(err);
                    return res(err);
                } else {
                    return res.json(docs);
                }
            });
        });



  });

app.listen(process.env.PORT || 8080, () => {
  console.log("Example app listening on port " + PORT);
});
