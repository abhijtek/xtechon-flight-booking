import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#042759]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-white font-bold text-xl cursor-pointer"
        >
          XTechon Fly
        </h1>

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
      </div>
    </div>
  );
}
