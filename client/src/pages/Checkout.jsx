import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bookFlight } from "../services/api";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!state) navigate("/");

const confirmBooking = async () => {
  setLoading(true);
  try {
    await bookFlight({
      flightId: state.flightId,
      passengerName: "Abhijeet Singh",
      email,
    });

   
    navigate("/bookings");
  } catch (err) {
    setError(err.response?.data?.error || "Booking failed");
  }
  setLoading(false);
};


  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Enter Email</h1>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full border px-3 py-2 rounded"
      />

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <button
        onClick={confirmBooking}
        disabled={loading}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded"
      >
        {loading ? "Processing..." : "Confirm & Send Ticket"}
      </button>
    </div>
  );
}
