import { useEffect, useState } from "react";
import { getBookings } from "../services/api";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings().then(res => setBookings(res.data.bookings));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Bookings</h1>

      {bookings.map(b => (
        <div key={b.pnr} className="border p-3 mb-2">
          <p>PNR: {b.pnr}</p>
          <p>Flight: {b.flightId}</p>
          <p>Price: ₹{b.finalPrice}</p>
        </div>
      ))}
    </div>
  );
}
