const express = require("express");
const router = express.Router();

const Flight = require("../models/Flight.js");

const { computePrice } = require("../services/priceService.js");

// home
router.get("/", async (req, res, next) => {
  try {
    const { departure, arrival } = req.query;
    const filter = {};
    if (departure) filter.departureCity = departure;
    if (arrival) filter.arrivalCity = arrival;

    // returning atmost 10
    const flights = await Flight.find(filter)
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(); // just saying again to remind myself it will return a json object rather than mongoose obj
    return res.json({ flights });
  } catch (err) {
    next(err); // going to next middlware
  }
});

// api/flights/:flightId/price
router.get("/:flightId/price",async(req,res,next)=>{
    try {
        const {flightId} = req.params; // when data is derived from req
        const d =  await computePrice(flightId);
        return res.json(d);
    } catch (err) {
        next(err);
    }
});

module.exports = router;