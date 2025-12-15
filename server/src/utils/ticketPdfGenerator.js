const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateTicketPDF(booking) {
  const fileName = `${booking.pnr}.pdf`;

  // private filesystem path (used internally only)
  const fileSystemPath = path.join(
    __dirname,
    "../../tickets",
    fileName
  );

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  doc.pipe(fs.createWriteStream(fileSystemPath));

  doc.fontSize(20).text("XTechon Fly - Flight Ticket", { align: "center" });
  doc.moveDown(2);

  doc.fontSize(12);
  doc.text(`PNR: ${booking.pnr}`);
  doc.text(`Passenger: ${booking.passengerName}`);
  doc.text(`Flight ID: ${booking.flightId}`);
  doc.text(`Price Paid: ₹${booking.finalPrice}`);
  doc.text(`Booking Time: ${booking.bookingTime}`);

  doc.end();

  // public path (safe to expose)
  const publicPath = `tickets/${fileName}`;

  return { fileSystemPath, publicPath };
}

module.exports = { generateTicketPDF };
