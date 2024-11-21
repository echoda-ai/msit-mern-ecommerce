import axios from "axios";
import { API_ENDPOINTS } from "../configs/apiEndpoints";

const API = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

export default API;
