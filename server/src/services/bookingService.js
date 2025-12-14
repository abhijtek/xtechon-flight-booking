const { generateTicketPDF } = require("../utils/ticketPdfGenerator");
const { sendTicketEmail } = require("../utils/emailService");
const BookingAttempt = require("../models/BookingAttempt");

const Wallet = require("../models/Wallet.js");
const Booking = require("../models/Booking.js");
const { computePrice } = require("./priceService.js");
const { generatePNR } = require("../utils/pnrGenerator.js");

async function createBooking({ flightId, passengerName, email }) {
  const userId = "demo_user";
// record booking attempt FIRST
await BookingAttempt.create({
  flightId,
  userId: "demo_user",
  createdAt: new Date(),
});

  // 1. Compute price
  const priceData = await computePrice(flightId);

  // 2. Wallet deduction (atomic)
  const wallet = await Wallet.findOneAndUpdate(
    { userId, balance: { $gte: priceData.finalPrice } },
    { $inc: { balance: -priceData.finalPrice } },
    { new: true }
  );

  if (!wallet) {
    throw new Error("INSUFFICIENT_BALANCE");
  }

  // 3. Create booking
  const pnr = generatePNR();

  const booking = await Booking.create({
    pnr,
    userId,
    flightId,
    passengerName,
    finalPrice: priceData.finalPrice,
    email,
    bookingTime: new Date(),
  });

  // 4. Generate PDF
  const { fileSystemPath, publicPath } =
    generateTicketPDF(booking);

  // store public path for frontend download
  booking.ticketPath = publicPath;
  await booking.save();

  // 5. Send email (USE FILESYSTEM PATH)
  await sendTicketEmail(email, fileSystemPath, booking);

  return booking;
}

module.exports = { createBooking };
