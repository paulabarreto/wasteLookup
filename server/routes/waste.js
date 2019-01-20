"use strict";

const express       = require('express');
const wasteRoutes  = express.Router();

module.exports = function() {

  wasteRoutes.get("/", function(req, res) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        console.log("hi");
        res.json(waste);
      }
  });

  return wasteRoutes;

}
