import { Api } from "@/api/Api";
import type { UserDto } from "@/models/entities/UserDto";
import type { AxiosInstance } from "axios";

export class UserApi extends Api {
  constructor(apiClient: AxiosInstance) {
    super(apiClient, "user/");
  }

  authorization = (payload: Partial<UserDto>) => {
    return this.postRequest<string, Partial<UserDto>>("login", payload);
  };

  registration = (payload: UserDto) => {
    return this.postRequest<string, UserDto>("create", payload);
  };
}
