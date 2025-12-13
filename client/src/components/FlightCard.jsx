import { useState } from "react";
import { getPrice, bookFlight } from "../services/api";

export default function FlightCard({ flight }) {
  const [price, setPrice] = useState(null);

  const checkPrice = async () => {
    const res = await getPrice(flight.flightId);
    setPrice(res.data);
  };

  const book = async () => {
    const res = await bookFlight({
      flightId: flight.flightId,
      passengerName: "Abhijeet Singh",
    });
    alert(`Booked! PNR: ${res.data.pnr}`);
  };

  return (
    <div className="border p-4 mb-3 rounded">
      <p className="font-semibold">
        {flight.flightId} ({flight.departureCity} → {flight.arrivalCity})
      </p>

      <button onClick={checkPrice} className="mr-3 text-blue-600">
        Check Price
      </button>

      <button onClick={book} className="text-green-600">
        Book
      </button>

      {price && (
        <p className="mt-2">
          ₹{price.finalPrice}
          {price.surgeActive && " (Surge Active)"}
        </p>
      )}
    </div>
  );
}
