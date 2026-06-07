import axios from "axios";

const api = axios.create({
  baseURL: "https://sponsrnet-backend.onrender.com/api",
});

export default api;

