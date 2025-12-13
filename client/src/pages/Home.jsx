import { useEffect, useState } from "react";
import { getFlights } from "../services/api";
import FlightCard from "../components/FlightCard";

export default function Home() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    getFlights().then(res => setFlights(res.data.flights));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Available Flights</h1>

      {flights.map(f => (
        <FlightCard key={f.flightId} flight={f} />
      ))}
    </div>
  );
}
