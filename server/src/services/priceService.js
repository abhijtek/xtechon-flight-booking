const Flight = require("../models/Flight.js");
const BookingAttempt = require("../models/BookingAttempt.js");

async function computePrice(flightId) {
  const flight = await Flight.findOne({ flightId });
  if (!flight) throw new Error("FLIGHT_NOT_FOUND");

  const basePrice = flight.basePrice;

  const now = Date.now();
  const fiveMinAgo = new Date(now - 5 * 60 * 1000);
  const tenMinAgo = new Date(now - 10 * 60 * 1000);

  // Count attempts within 5 minutes
  const count5 = await BookingAttempt.countDocuments({
    flightId,
    createdAt: { $gte: fiveMinAgo },
  });

  // Latest attempt
  const lastAttempt = await BookingAttempt.findOne({ flightId })
    .sort({ createdAt: -1 })
    .lean();

  // If 3+ attempts in last 5 minutes → surge
  if (count5 >= 3) {
    const lastThree = await BookingAttempt.find({
      flightId,
      createdAt: { $gte: fiveMinAgo },
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();

    const latestOfThree = lastThree[0]?.createdAt || new Date();
    const surgeExpiry = new Date(new Date(latestOfThree).getTime() + 10 * 60 * 1000);

    const finalPrice = Math.ceil(basePrice * 1.1);
    return { basePrice, finalPrice, surgeActive: true, surgeExpiry };
  }

  // If no attempts in 10 minutes → no surge
  if (!lastAttempt || new Date(lastAttempt.createdAt) < tenMinAgo) {
    return {
      basePrice,
      finalPrice: basePrice,
      surgeActive: false,
      surgeExpiry: null,
    };
  }

  // Default
  return {
    basePrice,
    finalPrice: basePrice,
    surgeActive: false,
    surgeExpiry: null,
  };
}

module.exports = { computePrice };
