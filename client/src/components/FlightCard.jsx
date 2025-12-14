import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPrice } from "../services/api";

export default function FlightCard({ flight }) {
  const [price, setPrice] = useState(null);
  const navigate = useNavigate();

  const checkPrice = async () => {
    const res = await getPrice(flight.flightId);
    setPrice(res.data);
  };

  const handleBuy = () => {
    navigate("/checkout", {
      state: { flightId: flight.flightId },
    });
  };

  return (
    <div className="border p-4 mb-3 rounded">
      <p className="font-semibold">
        {flight.flightId} ({flight.departureCity} → {flight.arrivalCity})
      </p>

      <button onClick={checkPrice} className="mr-3 text-blue-600">
        Check Price
      </button>

      <button onClick={handleBuy} className="text-green-600">
        Buy
      </button>

      {price && (
        <p className="mt-2">
          ₹{price.finalPrice}
        </p>
      )}
    </div>
  );
}
