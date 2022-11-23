import axios, { AxiosInstance } from "axios";
import { BASE_URL, TIME_OUT } from "src/features/constants";

export const Api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {
    "Content-Type": "application/json",
  },
});
