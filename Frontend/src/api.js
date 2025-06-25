import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/", // Replace with your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the Authorization header dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
