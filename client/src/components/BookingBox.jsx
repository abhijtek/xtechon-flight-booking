import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function BookingBox() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSearch = () => {
    if (!from || !to) {
      alert("Please enter both From and To locations");
      return;
    }

    navigate(
      `/flights?departure=${encodeURIComponent(from)}&arrival=${encodeURIComponent(to)}`
    );
  };

  return (
    <div className="bg-[#042759] rounded-2xl p-6 shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
        {/* From */}
        <div>
          <label className="text-white text-sm">From</label>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Country, city or airport"
            className="w-full mt-1 px-4 py-3 rounded-lg"
          />
        </div>

        {/* To */}
        <div>
          <label className="text-white text-sm">To</label>
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Country, city or airport"
            className="w-full mt-1 px-4 py-3 rounded-lg"
          />
        </div>

        {/* Depart */}
        <div>
          <label className="text-white text-sm">Depart</label>
          <input
            type="date"
            className="w-full mt-1 px-4 py-3 rounded-lg"
          />
        </div>

        {/* Return */}
        <div>
          <label className="text-white text-sm">Return</label>
          <input
            type="date"
            className="w-full mt-1 px-4 py-3 rounded-lg"
          />
        </div>

        {/* Travellers */}
        <div>
          <label className="text-white text-sm">Travellers</label>
          <input
            value="1 Adult, Economy"
            readOnly
            className="w-full mt-1 px-4 py-3 rounded-lg bg-white"
          />
        </div>

        {/* Search */}
        <button
          onClick={handleSearch}
          className="
            h-[52px]
            bg-blue-600 text-white font-semibold
            rounded-lg
            hover:bg-blue-700
            active:scale-95
            transition
          "
        >
          Search
        </button>
      </div>

      <p className="text-xs text-gray-300 mt-4">
        Prices may change based on demand.
      </p>
    </div>
  );
}
