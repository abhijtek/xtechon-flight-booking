const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendTicketEmail(to, pdfPath, booking) {
  await transporter.sendMail({
    from: `"XTechon Fly" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Flight Ticket",
    text: `Your booking is confirmed.\nPNR: ${booking.pnr}`,
    attachments: [
      {
        filename: `${booking.pnr}.pdf`,
        path: pdfPath,
      },
    ],
  });
}

module.exports = { sendTicketEmail };
