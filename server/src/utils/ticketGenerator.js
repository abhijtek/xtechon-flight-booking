const fs = require("fs");
const path = require("path");

function generateTicket(booking) {
  const content = `
    <html>
      <body>
        <h1>Flight Ticket</h1>
        <p><strong>PNR:</strong> ${booking.pnr}</p>
        <p><strong>Flight:</strong> ${booking.flightId}</p>
        <p><strong>Passenger:</strong> ${booking.passengerName}</p>
        <p><strong>Price Paid:</strong> ₹${booking.finalPrice}</p>
        <p><strong>Date:</strong> ${new Date(booking.bookingTime).toLocaleString()}</p>
      </body>
    </html>
  `;

  const filePath = path.join(__dirname, "../../tickets", `${booking.pnr}.html`);
  fs.writeFileSync(filePath, content);

  return filePath;
}

module.exports = { generateTicket };
