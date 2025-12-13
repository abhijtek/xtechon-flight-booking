import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getFlights } from "../services/api";
import FlightCard from "../components/FlightCard";

export default function Flights() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    getFlights().then(res => setFlights(res.data.flights));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-xl font-semibold mb-4">
          Available Flights
        </h1>

        {flights.map(f => (
          <FlightCard key={f.flightId} flight={f} />
        ))}
      </div>
    </div>
  );
}
