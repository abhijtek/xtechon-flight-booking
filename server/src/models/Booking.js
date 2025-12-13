const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  pnr: { type: String, unique: true, required: true },
  userId: { type: String, required: true },
  flightId: { type: String, required: true },
  passengerName: { type: String, required: true },
  finalPrice: { type: Number, required: true },
  bookingTime: { type: Date, default: Date.now },
  ticketPath: { type: String, default: null }
});

module.exports = mongoose.model('Booking', BookingSchema);
