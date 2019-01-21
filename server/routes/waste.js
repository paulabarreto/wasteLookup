"use strict";

const express       = require('express');
const wasteRoutes  = express.Router();

module.exports = function(DataHelpers) {

  //Fetches the data
  wasteRoutes.get("/", (req, res) => {
    data.find({}).toArray(function (err, docs) {

      if(err) throw err;

      console.log(docs);
      res.send(docs);
    });
  });

  //Search for keywords
  wasteRoutes.post("/", function(req, res) {
        const search = req.body.search;
        DataHelpers.findData(search, function(err, docs){
            if (err) {
                res.send(err);
            } else {
                return res.json(docs);

            }
        });
    });

    wasteRoutes.put("/favourites", function(req, res) {
          const fave = req.body;
          DataHelpers.postFave(fave, function(err, docs){
              if (err) {
                  console.log(err);
                  res.send(err);
              } else {
                  res.json(docs);
              }
          });
      });

      wasteRoutes.put("/unfavourites", function(req, res) {
            const fave = req.body;
            DataHelpers.removeFave(fave, function(err, docs){
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    res.json(docs);
                }
            });
        });

  return wasteRoutes;

}
