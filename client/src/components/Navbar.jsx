import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#042759]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-white font-bold text-xl cursor-pointer"
        >
          XTechon Fly
        </h1>

        {/* Nav buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/flights")}
            className="
              bg-blue-600 text-white
              px-4 py-2 rounded-lg
              hover:bg-blue-700
              transition
            "
          >
            Flights
          </button>

<button
  onClick={() => navigate("/bookings")}
  className="
    bg-transparent text-white
    px-4 py-2 rounded-lg
    border border-white/30

    hover:bg-white/10
    hover:border-white/60

    active:scale-95
    transition-all duration-200
  "
>
  My Bookings
</button>

        </div>
      </div>
    </div>
  );
}
