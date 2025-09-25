import { BASE_URL, WEB_CLOSE_TOKEN } from "@/constants";
import axios from "axios";

const https = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

// Add a request interceptor
https.interceptors.request.use(function (config: any) {
  const token = localStorage.getItem(WEB_CLOSE_TOKEN);
  if (token) {
    // Configure this as per your backend requirements
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

// Add a response interceptor
https.interceptors.response.use(
  function (response: any) {
    return { ...response.data };
  },
  async function (err: any) {
    return { ...err.response?.data };
  }
);
export default https;
