import axios, { Axios, AxiosInstance, AxiosRequestConfig } from "axios";
import { BASE_URL, TIME_OUT } from "src/features/constants";
import { useCookies } from "vue3-cookies";

// 基本設定
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// アクセストークンをヘッダーに追加
axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers !== undefined) {
    const { cookies } = useCookies();
    const token = cookies.get("token");
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
  }
  return config;
});

export const Api = axiosInstance;
