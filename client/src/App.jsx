import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Flights from "./pages/Flights";
import Bookings from "./pages/Bookings";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/checkout" element={<Checkout />} />

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
