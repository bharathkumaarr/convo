import axios from "axios";

const api = axios.create({
  baseURL: "https://convo-s3xe.onrender.com/api",
  withCredentials: true, 
});

export default api;
