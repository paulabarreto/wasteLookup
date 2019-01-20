"use strict";

require('dotenv').config();


const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

const mongodb = require('mongodb');
const dataHelpers = require('./data-helpers.js');


// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname

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


  app.get("/", (req, res) => {
    data.find({}).toArray(function (err, docs) {

      if(err) throw err;

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
                console.log(docs);
                return res.json(docs);
            }
        });
    });

  /*
   * First we'll add a few songs. Nothing is required to create the
   * songs collection; it is created automatically when we insert.
   */


  });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
