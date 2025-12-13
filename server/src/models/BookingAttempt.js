const mongoose = require("mongoose");

const BookingAttemptSchema = new mongoose.Schema({
  flightId: { type: String, required: true, index: true },
  userId: { type: String, default: "demo_user" },
  createdAt: { type: Date, default: Date.now, index: true },
});

module.exports = mongoose.model("BookingAttempt", BookingAttemptSchema);
