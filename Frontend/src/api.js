import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Replace with your backend base URL
  headers: {
    "Content-Type": "application/json",
    // Include Authorization header if token exists
     // Adjust based on your token storage mechanism
     
  },
});

export default api;
