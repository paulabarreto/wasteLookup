"use strict";

const express       = require('express');
const wasteRoutes  = express.Router();

module.exports = function(DataHelpers) {

  wasteRoutes.get("/", function(req, res) {
    DataHelpers.getWaste((err, waste) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(waste);
      }
    });
  });

  return wasteRoutes;

}
