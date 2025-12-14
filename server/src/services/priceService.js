const Booking = require("../models/Booking");
const Flight = require("../models/Flight");

async function computePrice(flightId) {
  const flight = await Flight.findOne({ flightId });
  if (!flight) throw new Error("FLIGHT_NOT_FOUND");

  const basePrice = flight.basePrice;

  const now = Date.now();
  const fiveMinAgo = new Date(now - 5 * 60 * 1000);

  const recentBookings = await Booking.find({
    flightId,
    bookingTime: { $gte: fiveMinAgo }
  })
    .sort({ bookingTime: 1 }) // oldest → newest
    .lean();

  if (recentBookings.length < 3) {
    return {
      basePrice,
      finalPrice: basePrice,
      surgeActive: false,
      surgeExpiry: null
    };
  }

  const thirdBookingTime = recentBookings[2].bookingTime;

  const surgeExpiry = new Date(
    new Date(thirdBookingTime).getTime() + 10 * 60 * 1000
  );

  if (surgeExpiry < new Date()) {
    return {
      basePrice,
      finalPrice: basePrice,
      surgeActive: false,
      surgeExpiry: null
    };
  }

  return {
    basePrice,
    finalPrice: Math.ceil(basePrice * 1.1),
    surgeActive: true,
    surgeExpiry
  };
}

module.exports = { computePrice };
