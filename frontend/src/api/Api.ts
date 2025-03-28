import { Token } from "@/models/browser/Token";
import axios, { type AxiosInstance } from "axios";

export class Api {
  protected apiClient: AxiosInstance;
  protected endpoint: string;
  constructor(apiClient: AxiosInstance, endpoint: string) {
    this.apiClient = apiClient;
    this.endpoint = endpoint;
  }

  protected getRequest = <T>(node: string): Promise<T> => {
    return this.apiClient.get(this.endpoint + node).then((res) => res.data);
  };

  protected postRequest = <T, S>(node: string, payload: S): Promise<T> => {
    return this.apiClient
      .post(this.endpoint + node, payload)
      .then((res) => res.data);
  };
}
