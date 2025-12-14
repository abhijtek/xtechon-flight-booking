import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const getFlights = ({ page }) =>
  API.get(`/flights?page=${page}`);

export const getPrice = (flightId) =>
  API.get(`/flights/${flightId}/price`);

export const bookFlight = (data) =>
  API.post("/book", data);

export const getBookings = () =>
  API.get("/bookings");
