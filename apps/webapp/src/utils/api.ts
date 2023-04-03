import { API_URL } from "@constants";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});
