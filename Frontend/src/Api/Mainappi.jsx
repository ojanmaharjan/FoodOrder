import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

// Auto-add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (userData) => API.post("/register/", userData);
export const login = (credentials) => API.post("/login/", credentials);
export const checkAuth = () => API.get("/protected/");  // Example protected route