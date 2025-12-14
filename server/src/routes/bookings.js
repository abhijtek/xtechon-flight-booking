const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking.js");
const { createBooking } = require("../services/bookingService.js");

// CREATE BOOKING
router.post("/book", async (req, res, next) => {
  try {
    const { flightId, passengerName, email } = req.body;

    if (!email) throw new Error("EMAIL_REQUIRED");

    const booking = await createBooking({
      flightId,
      passengerName,
      email,
    });

    res.json({
      pnr: booking.pnr,
      message: "Booking confirmed. Ticket sent to email.",
    });
  } catch (err) {
    next(err);
  }
});


router.get("/bookings", async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: "demo_user" })
      .sort({ bookingTime: -1 })
      .lean();

    res.json({ bookings });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
