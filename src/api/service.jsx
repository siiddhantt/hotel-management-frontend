import axios from "axios";
import { API_URL } from "./config";

const API_Service = {
  getPrice: (body) => {
    return axios.post(API_URL + "/rooms/price", body);
  },
  getBookings: () => {
    return axios.get(API_URL + "/bookings/all");
  },
  createBooking: (body) => {
    return axios.post(API_URL + "/bookings/create", body);
  },
  updateBooking: (body) => {
    return axios.post(API_URL + "/bookings/update", body);
  },
  deleteBooking: (body) => {
    return axios.post(API_URL + "/bookings/delete", body);
  },
};

export default API_Service;
