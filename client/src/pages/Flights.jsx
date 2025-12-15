import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getFlights } from "../services/api";
import FlightCard from "../components/FlightCard";

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);

        const res = await getFlights({ page });
        const newFlights = res.data.flights || [];

        if (newFlights.length === 0) {
          setHasMore(false);
        } else {
          setFlights(prev => [...prev, ...newFlights]);
        }
      } catch (err) {
        console.error("Failed to load flights", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights(); 
  }, [page]);

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

        {loading && (
          <p className="text-center text-gray-500 mt-4">
            Loading flights...
          </p>
        )}

        {!loading && hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setPage(p => p + 1)}
              className="
                px-6 py-2
                border rounded-lg
                hover:bg-gray-100
              "
            >
              Load More Flights
            </button>
          </div>
        )}

        {!hasMore && flights.length > 0 && (
          <p className="text-center text-gray-500 mt-6">
            No more flights available.
          </p>
        )}
      </div>
    </div>
  );
}
