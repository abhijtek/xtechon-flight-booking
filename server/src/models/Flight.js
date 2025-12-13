const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
  flightId: { type: String, unique: true, required: true }, // e.g. XH100
  airline: { type: String, required: true },
  departureCity: { type: String, required: true },
  arrivalCity: { type: String, required: true },
  basePrice: { type: Number, required: true }, // 2000-3000
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Flight", FlightSchema);
