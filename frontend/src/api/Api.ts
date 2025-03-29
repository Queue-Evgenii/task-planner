import type { HttpResponse } from "@/models/entities/HttpResponse";
import { type AxiosInstance } from "axios";

export class Api {
  protected apiClient: AxiosInstance;
  protected endpoint: string;
  constructor(apiClient: AxiosInstance, endpoint: string) {
    this.apiClient = apiClient;
    this.endpoint = endpoint;
  }

  protected getRequest = async <T>(node: string): Promise<HttpResponse<T>> => {
    return this.apiClient.get(this.endpoint + node).then((res) => res.data);
  };

  protected postRequest = async <T, S>(node: string, payload: S): Promise<HttpResponse<T>> => {
    return this.apiClient
      .post(this.endpoint + node, payload)
      .then((res) => res.data);
  };

  protected putRequest = async <T, S>(node: string, payload: S): Promise<HttpResponse<T>> => {
    return this.apiClient
      .put(this.endpoint + node, payload)
      .then((res) => res.data);
  };

  protected deleteRequest = async <T>(node: string): Promise<HttpResponse<T>> => {
    return this.apiClient.delete(this.endpoint + node).then((res) => res.data);
  };
}
