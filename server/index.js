"use strict";

require('dotenv').config();


const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
var methodOverride = require("method-override");
const app           = express();

const mongodb = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

mongodb.MongoClient.connect(MONGODB_URI, function(err, client) {

  if(err) throw err;

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static("public"));

  const db = client.db('wastewizard');

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const wasteRoutes = require("./routes/waste")(DataHelpers);
  app.use("/waste", wasteRoutes);

});


app.listen(process.env.PORT || 8080, () => {
  console.log("Example app listening on port " + PORT);
});
