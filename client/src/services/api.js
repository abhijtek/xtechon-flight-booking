import axios from "axios";

const API = axios.create({
  baseURL: "https://xtechon-flight-booking.onrender.com/api",
});

export const getFlights = ({ page }) =>
  API.get(`/flights?page=${page}`);

export const getPrice = (flightId) =>
  API.get(`/flights/${flightId}/price`);

export const bookFlight = (data) =>
  API.post("/book", data);

export const getBookings = () =>
  API.get("/bookings");
