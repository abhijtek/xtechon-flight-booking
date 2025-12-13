// User clicks Book
//    ↓
// Record booking attempt
//    ↓
// Calculate price (surge logic)
//    ↓
// Check wallet
//    ↓
// Deduct wallet atomically
//    ↓
// Generate PNR
//    ↓
// Create booking record
//    ↓
// Generate ticket file
//    ↓
// Return response

const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { createBooking } = require("../services/bookingService");

router.post("/book", async (req, res, next) => {
    try {
        const {flightId,passengerName} = req.body;
        if(!flightId || !passengerName){
            throw new Error("INVALID_INPUT");
        }
        const booking = await createBooking({flightId,passengerName});
         res.json({
      pnr: booking.pnr,
      flightId: booking.flightId,
      finalPrice: booking.finalPrice,
      ticketPath: booking.ticketPath
    });
    } catch (err) {
      next(err);   
    }
});

// get bookings

router.get("/bookings", async(req,res,next)=>{
    try {
        const bookings = Booking.find({userId: "demo_user"})
        .sort({bookingTime: -1})
        .lean();
        res.json({bookings});
    } catch (error) {
        next(error);
    }
});

module.exports = router;
