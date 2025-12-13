import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getBookings } from "../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings().then(res => setBookings(res.data.bookings));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold mb-6">
          My Booking History
        </h1>

        {bookings.length === 0 && (
          <p className="text-gray-500">No bookings found.</p>
        )}

        {bookings.map(b => (
          <div
            key={b.pnr}
            className="bg-white rounded-xl p-6 mb-4 shadow-sm border"
          >
            {/* Top row */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-lg font-semibold">
                  Flight {b.flightId}
                </p>
                <p className="text-sm text-gray-500">
                  Booking Date:{" "}
                  {new Date(b.bookingTime).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">PNR</p>
                <p className="font-mono font-semibold">
                  {b.pnr}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-wrap gap-6 text-sm mb-4">
              <div>
                <p className="text-gray-500">Amount Paid</p>
                <p className="font-semibold">
                  ₹{b.finalPrice}
                </p>
              </div>
            </div>

            {/* Actions */}
            {b.ticketPath && (
              <a
                href={`http://localhost:4000/${b.ticketPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-block
                  px-4 py-2
                  border border-blue-600
                  text-blue-600
                  rounded-lg
                  hover:bg-blue-50
                  transition
                "
              >
                Download Ticket (PDF)
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
