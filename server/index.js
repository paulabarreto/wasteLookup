"use strict";

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const {MongoClient} = require("mongodb");

const db = require("./lib/in-memory-db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const DataHelpers = require("./lib/data-helpers.js")(db);
const wasteRoutes = require("./routes/waste")(DataHelpers);
app.use("/waste", wasteRoutes);

app.listen(PORT, () => {
 console.log("Example app listening on port " + PORT);
});
