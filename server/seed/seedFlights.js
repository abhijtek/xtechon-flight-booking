/**
 * Run with: npm run seed
 * Seeds 12 flights + demo wallet
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Flight = require('../src/models/Flight');
const Wallet = require('../src/models/Wallet');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/xtechon_flights';

const flights = [
  { flightId: 'XH100', airline: 'XTech Air', departureCity: 'DEL', arrivalCity: 'BOM', basePrice: 2500 },
  { flightId: 'XH101', airline: 'XTech Air', departureCity: 'DEL', arrivalCity: 'BLR', basePrice: 2600 },
  { flightId: 'XH102', airline: 'XTech Air', departureCity: 'DEL', arrivalCity: 'HYD', basePrice: 2200 },
  { flightId: 'XH103', airline: 'XTech Air', departureCity: 'DEL', arrivalCity: 'MAA', basePrice: 2400 },
  { flightId: 'XH104', airline: 'XTech Air', departureCity: 'BOM', arrivalCity: 'DEL', basePrice: 2300 },
  { flightId: 'XH105', airline: 'XTech Air', departureCity: 'BOM', arrivalCity: 'BLR', basePrice: 2700 },
  { flightId: 'XH106', airline: 'XTech Air', departureCity: 'BLR', arrivalCity: 'DEL', basePrice: 2100 },
  { flightId: 'XH107', airline: 'XTech Air', departureCity: 'HYD', arrivalCity: 'DEL', basePrice: 2050 },
  { flightId: 'XH108', airline: 'XTech Air', departureCity: 'MAA', arrivalCity: 'DEL', basePrice: 1950 }, // okay slightly below but fine
  { flightId: 'XH109', airline: 'XTech Air', departureCity: 'DEL', arrivalCity: 'COK', basePrice: 2800 },
  { flightId: 'XH110', airline: 'XTech Air', departureCity: 'COK', arrivalCity: 'DEL', basePrice: 2900 },
  { flightId: 'XH111', airline: 'XTech Air', departureCity: 'DEL', arrivalCity: 'GOI', basePrice: 2450 }
];

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB for seeding');

  // clear existing
  await Flight.deleteMany({});
  await Wallet.deleteMany({});

  await Flight.insertMany(flights);
  console.log('Inserted flights:', flights.length);

  // create demo wallet
  await Wallet.create({ userId: 'demo_user', balance: Number(process.env.DEFAULT_WALLET_BALANCE || 50000) });
  console.log('Created demo wallet with balance', process.env.DEFAULT_WALLET_BALANCE || 50000);

  await mongoose.disconnect();
  console.log('Seeding done. Disconnected.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
