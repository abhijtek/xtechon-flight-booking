const BookingAttempt = require("../models/BookingAttempt.js")

const Wallet = require("../models/Wallet.js");
const Booking = require("../models/Booking.js");
const { computePrice } = require("./priceService.js");
const { generatePNR } = require("../utils/pnrGenerator.js");
const { generateTicket } = require("../utils/ticketGenerator.js");

async function createBooking({flightId, passengerName}){
  const userId = "demo_user";
    // register bookign attempt
    await BookingAttempt.create({flightId,userId});

    const priceData = await computePrice(flightId);

    // filter 
   const filter = {
    userId : userId,
    balance: {
        $gte: priceData.finalPrice
    },
   }
    // update
    const update = {
        $inc : {
            balance : -priceData.finalPrice
        }
    }
    // options
    const options = {
        new : true
    }
    const wallet = await Wallet.findOneAndUpdate(filter,update,options);

    if(!wallet){
        throw new Error("INSUFFICIENT_BALANCE");
    }

    // pnr genertion - not await, generate in background
    const pnr = generatePNR();

    // create booking
    const booking = await Booking.create({
        pnr,
        userId,
        flightId,
        passengerName,
        finalPrice: priceData.finalPrice,
        bookingTime : new Date()
    });

    // generate ticket
    // gentick return file path of ticket html file
    const ticketPath = generateTicket(booking);
    booking.ticketPath = ticketPath;
    await booking.save();

    return booking;
}

module.exports = {createBooking};
