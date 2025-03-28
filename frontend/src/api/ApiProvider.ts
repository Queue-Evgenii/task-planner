import { provide } from "vue";
import axios from "axios";
import { UserApi } from "@/api/modules/User";
import { Token } from "@/models/browser/Token";

export function useApiProvider() {
  const apiClient = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 1000,
    headers: {
      ContentType: "application/json",
      Accept: "application/json",
    },
  });
  apiClient.interceptors.request.use((config) => {
    if (Token.exists()) {
      config.headers.Authorization = `Bearer ${Token.get()}`;
    }
    return config;
  });

  provide("UserApi", new UserApi(apiClient));
}
