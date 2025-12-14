const express = require("express");
const router = express.Router();

const Flight = require("../models/Flight.js");
const { computePrice } = require("../services/priceService.js");

// GET /api/flights?departure=&arrival=&page=
router.get("/", async (req, res, next) => {
  try {
    const { departure, arrival, page = 1 } = req.query;

    const filter = {};
    if (departure) filter.departureCity = departure;
    if (arrival) filter.arrivalCity = arrival;

    const limit = 10;
    const skip = (Number(page) - 1) * limit;

    const flights = await Flight.find(filter)
      .sort({ flightId: 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return res.json({ flights });
  } catch (err) {
    next(err);
  }
});

// GET /api/flights/:flightId/price
router.get("/:flightId/price", async (req, res, next) => {
  try {
    const { flightId } = req.params;
    const price = await computePrice(flightId);
    return res.json(price);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
