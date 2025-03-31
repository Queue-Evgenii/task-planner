import { provide, type App } from "vue";
import axios from "axios";
import { Token } from "@/models/utils/browser/Token";
import { TaskApi } from "./modules/Task";
import { AuthApi } from "./modules/user/Auth";
import { UserApi } from "./modules/user/User";

export function useApiProvider(app: App) {
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

  app.provide("UserApi", new UserApi(apiClient));
  app.provide("AuthApi", new AuthApi(apiClient));
  app.provide("TaskApi", new TaskApi(apiClient));
}
