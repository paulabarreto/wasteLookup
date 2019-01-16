"use strict";

// Requiring a JSON file automatically parses it and returns the data.
const db = {
  waste: require("../data-files/waste-data")
}

module.exports = db;
